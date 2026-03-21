

## Fix Intermittent YouTube and Calendar Feed Issues

### Problem Summary
The YouTube and event feeds stop working periodically due to:
1. **Stateless edge functions** - in-memory cache is lost on every cold start
2. **External API rate limiting** - YouTube blocks/throttles requests from server IPs
3. **Fragile scraping** - YouTube HTML parsing can fail when structure changes

---

### Solution: Database-Backed Cache + Retry Logic

#### Phase 1: Create Database Cache Table

Create a new table to persist cached API responses across cold starts:

```text
+------------------+
|   api_cache      |
+------------------+
| cache_key (PK)   |
| cached_data      |
| expires_at       |
| created_at       |
| updated_at       |
+------------------+
```

- `cache_key`: Unique identifier (e.g., "youtube_videos", "calendar_events")
- `cached_data`: JSONB column storing the cached response
- `expires_at`: Timestamp for cache expiration (configurable TTL)
- RLS: Service role only (edge functions use service role)

---

#### Phase 2: Update fetch-youtube Edge Function

Changes to `supabase/functions/fetch-youtube/index.ts`:

1. **Add database cache check first**
   - Query `api_cache` table for "youtube_videos" entry
   - Return cached data if not expired (15-30 minute TTL)

2. **Add retry logic with delays**
   - If YouTube fetch fails, wait 500ms and retry once
   - Helps with transient rate limiting

3. **Store successful responses in database**
   - After fetching from YouTube, upsert to `api_cache`
   - Set appropriate expiration time

4. **Fallback to stale cache on errors**
   - If fresh fetch fails, return expired cache with warning
   - Better than showing empty/error state

---

#### Phase 3: Update fetch-calendar Edge Function

Same pattern for `supabase/functions/fetch-calendar/index.ts`:

1. Database cache check for "calendar_events"
2. Retry logic for Planning Center iCal fetch
3. Store successful responses in database
4. Fallback to stale cache on errors

---

#### Phase 4: Add Supabase Client to Edge Functions

Both functions need:
- Import `createClient` from Supabase
- Initialize client with service role key
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is available

---

### Technical Details

**Database Migration:**
```sql
CREATE TABLE public.api_cache (
  cache_key TEXT PRIMARY KEY,
  cached_data JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- No RLS needed - only accessed via service role in edge functions
ALTER TABLE public.api_cache ENABLE ROW LEVEL SECURITY;

-- Deny all public access
CREATE POLICY "Deny all access to api_cache" 
  ON public.api_cache FOR ALL TO anon, authenticated USING (false);
```

**Cache Flow Diagram:**
```text
Request comes in
       |
       v
+------------------+
| Check DB Cache   |
+------------------+
       |
  Cache valid? ----Yes---> Return cached data
       |
      No
       |
       v
+------------------+
| Fetch from API   |
+------------------+
       |
  Success? ----No---> Check stale cache
       |                    |
      Yes              Has stale? --Yes--> Return stale + warning
       |                    |
       v                   No
+------------------+        |
| Update DB cache  |        v
+------------------+   Return error
       |
       v
   Return data
```

**Cache TTL Strategy:**
- YouTube: 30 minutes (videos don't change often)
- Calendar: 15 minutes (events may be updated more frequently)
- Stale cache fallback: Up to 24 hours

---

### Files to Modify
1. **New migration**: Create `api_cache` table
2. **supabase/functions/fetch-youtube/index.ts**: Add DB cache logic
3. **supabase/functions/fetch-calendar/index.ts**: Add DB cache logic

---

### Benefits
- Cache survives cold starts
- Reduced external API calls (less rate limiting)
- Graceful degradation with stale data fallback
- Improved reliability and user experience

