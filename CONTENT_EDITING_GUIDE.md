# 📝 How to Edit Your Website Content

## Quick Start Guide for Vibrant Hill Church

Welcome! This guide will show you how to safely update your website content without breaking anything.

---

## 🎯 The Golden Rule

**Only edit ONE file:** `src/data/siteContent.ts`

This file contains all the text and images you can safely change. Everything else (layout, colors, styles) is locked and protected.

---

## ✅ What You CAN Edit

| Content Type | Where to Find It |
|-------------|------------------|
| Hero headline & subheadline | `heroContent` section |
| Mission statement | `missionContent` section |
| Quick action cards (I'm New, Connect, Join) | `quickActionCards` section |
| Beliefs section text | `beliefsContent` section |
| Service times & address | `serviceInfoContent` section |
| "What to Expect" cards | `expectationsContent` section |
| Upcoming events | `eventsContent` section |
| Watch section text | `watchContent` section |
| Final CTA (You Belong Here) | `ctaContent` section |
| Footer info (address, phone, email) | `footerContent` section |

---

## 🖼️ How to Change Images

1. Add your new image to the `src/assets/church/` folder
2. Open `src/data/siteContent.ts`
3. Find the import section at the top (lines 20-25)
4. Update the file name to match your new image

**Example:**
```typescript
// Before
import heroImage from '@/assets/church/hero-worship.png';

// After (if you added a new file called "new-hero.jpg")
import heroImage from '@/assets/church/new-hero.jpg';
```

---

## ⚠️ What NOT to Do

- ❌ Don't delete any lines
- ❌ Don't change property names (the words before the colons)
- ❌ Don't remove quotation marks, commas, or brackets
- ❌ Don't edit any files other than `siteContent.ts`
- ❌ Don't resize or move sections on the page

---

## 📋 Step-by-Step: Editing Text

1. Open the file `src/data/siteContent.ts`
2. Find the section you want to edit (use the comments as guides)
3. Change ONLY the text inside the quotation marks `" "`
4. Save the file
5. Preview your changes
6. Click **Publish** when ready

---

## 🔧 Example: Changing Service Time

**Before:**
```typescript
export const serviceInfoContent = {
  serviceTime: "Sundays at 10:00 AM",
  // ...
};
```

**After:**
```typescript
export const serviceInfoContent = {
  serviceTime: "Sundays at 9:30 AM",
  // ...
};
```

---

## 📅 Updating Events

Find the `eventsContent.events` array and edit individual event details:

```typescript
events: [
  {
    id: 1,
    title: "Sunday Worship Service",      // ← Change this
    date: "Every Sunday",                  // ← Change this
    time: "10:00 AM",                      // ← Change this
    description: "Join us for worship...", // ← Change this
  },
  // More events...
]
```

---

## 🆘 Need Help?

If something looks broken or you're unsure about a change:

1. **Don't panic** - Just undo your last change
2. **Preview first** - Always preview before publishing
3. **Contact support** - Reach out to your web administrator

---

## ✨ You're All Set!

Remember: The content file is designed so you can only change what's safe to change. Layout, styling, and structure are all protected. 

Happy editing! 🙏
