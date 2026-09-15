# Vibrant Church — redesign prompt (palette locked)

Paste everything from **Prompt** down into Claude Code opened at this project root.
Fill the one `<<< >>>` slot.

- `<<<DIRECTION>>>` — one or two vibe words. Suggested: `warmer and more editorial, with real
  hierarchy`. Others that fit this brand: `calmer and more confident`, `bolder, less templated`.

---

## Prompt

Redesign the public site of this project. Direction: <<<DIRECTION>>>.

**In scope:** `/`, `/about`, `/visit`, `/ministries`, `/events`, `/watch`, `/give`, `/contact`, plus
`src/components/layout/Header.tsx` and `Footer.tsx` and the `src/components/home/*` sections.
**Out of scope, do not touch:** `src/pages/Admin.tsx`, `Auth.tsx`, `StaffLogin.tsx`, `Portfolio.tsx`,
`ProjectDetail.tsx`, `src/components/admin/**`, `src/integrations/**`, `api/`, `server.js`, `supabase/`.

**The brand colours and the fonts are frozen.** This is a structure, hierarchy, spacing, typography
and motion redesign — not a rebrand.

### Context you need before you start

Stack: Vite + React 18 + TypeScript, **Tailwind v4** (no `tailwind.config.ts` — the theme lives in
`@theme` inside `src/index.css`), shadcn/ui on CSS variables, framer-motion (used in ~35 files),
GSAP and Swiper (one file each), Supabase, react-router-dom v6.

**This project has two palettes, and they do not match.** `src/index.css` defines a token system,
but every public page and the layout ignore it and hardcode hex:

| Role | Hardcoded in pages (**the truth**) | Token in `index.css` (drifted) |
|---|---|---|
| Navy | `#1a365d` — 224 uses — `hsl(215 56% 23%)` | `--primary` / `--church-navy` `hsl(215 65% 25%)` = `#163969` |
| Gold | `#d4a843` — 143 uses — `hsl(42 63% 55%)` | `--secondary` / `--church-gold` `hsl(38 92% 50%)` = `#f59f0a` |
| Cream | `#f5f0e8` — 25 uses — `hsl(37 39% 94%)` | `--background` / `--church-cream` `hsl(40 30% 98%)` = `#fbfaf8` |
| Gold hover | `#c49a3a` — `hsl(42 54% 50%)` | (none) |

The gold is the big one: the real brand gold is a muted antique gold, the token is a bright amber.
**The hardcoded hex values are canonical.** The tokens are wrong and will be corrected to match them.

### Phase 0 — Lock the palette, then unify it

1. Run `/impeccable document` to write `DESIGN.md`. Correct any colour it extracts from the token
   system to the hex values in the table above.
2. Snapshot every colour currently in the source:

       grep -rhoE '#[0-9a-fA-F]{3,8}\b|rgba?\([0-9][^)]*\)|hsl\([^)]*\)' src \
         --include='*.tsx' --include='*.ts' --include='*.css' \
         | tr 'A-F' 'a-f' | sort -u > .design-lock.txt

3. **Add the real brand colours as first-class tokens** in `src/index.css` — new `--brand-*` custom
   properties holding the exact hex values above, exposed through `@theme` as `--color-brand-navy`,
   `--color-brand-gold`, `--color-brand-gold-hover`, `--color-brand-cream`.
4. **Replace every hardcoded hex literal in the in-scope files with those tokens** — `bg-[#1a365d]`
   becomes `bg-brand-navy`, and so on. This is a mechanical substitution with **provably zero visual
   change**; do it as its own commit before any design work.
5. **Then** retune `--primary`, `--secondary`, `--church-navy`, `--church-gold`, `--church-cream` to
   the same values, so the shadcn primitives finally render in the real brand colours. This *will*
   shift buttons, badges and form controls slightly — that is the intended correction. Show me
   before/after screenshots of one page with buttons and one form before continuing.

Do not proceed past this phase without showing me the token diff.

### Phase 1 — Diagnose, do not fix yet

Run `/impeccable audit` and `/impeccable critique` across the in-scope pages, then apply the
`redesign-existing-projects` audit. Give me **one** written defect list, grouped:

- **A. Structure** — layout, composition, hierarchy, section pacing, spacing rhythm, responsive breaks
- **B. Typography** — scale, weight ladder, measure, tracking, leading, orphans (families excluded)
- **C. Depth & motion** — framer-motion is already in ~35 files; judge coherence and restraint, not volume
- **D. Copy & states** — labels, CTAs, empty/error/hover/focus, accessibility
- **E. Palette findings — record only, do not act**

Four things I already know are wrong; confirm and add to the list:

- `src/App.css` is **unmodified Vite/React starter template** — a `#root` max-width rule, a
  spinning-logo animation, `#646cffaa` / `#61dafbaa`. It is imported by nothing (`main.tsx` loads only
  `index.css`), so it is dead weight rather than an active bug. Confirm that, then delete the file.
- The `.dark` block in `index.css` defines a full dark theme, but the hardcoded public pages can
  never respond to it. Report the state; **do not build dark mode** in this pass.
- `text-[10px]` and `text-[0.8rem]` appear as arbitrary sizes — below the legibility floor.
- Arbitrary Tailwind values (`bg-[...]`, `border-[1.5px]`) scattered through the pages instead of scale values.

### Phase 2 — The constraint

**Allowed:** using an existing brand colour somewhere new; changing its opacity; deriving a tint or
shade by adjusting *lightness only* — same hue, same saturation — where contrast requires it;
re-assigning which token an element uses.

**Forbidden:** new hues; saturation changes; a different gold, navy or cream; flipping light/dark;
gradients, shadows or overlays in a hue not already in `.design-lock.txt`; imagery in a different
colour key; changing font *families*.

**Never touch these third-party brand colours:** PayPal `#0070ba` / `#005ea6` in
`src/components/giving/CustomDonationForm.tsx`, and YouTube red `hsl(0 100% 35%)` / `hsl(0 100% 40%)`
in `src/components/home/YouTubeChannelSection.tsx`. They are correct as-is.

**Fonts are frozen:** `Playfair Display` (display), the `system-ui` stack (body), `Caveat`
(handwritten accent) — self-hosted via `@font-face` in `index.css`. Size, weight, tracking, leading
and measure are all fully in scope. The families are not. Do not add a webfont.

**Both skills will push you to break this.** `redesign-existing-projects` will tell you to desaturate
accents over 80%, replace cream backgrounds, and swap in "fonts with character".
`design-taste-frontend` has anti-default rules that fire on exactly this kind of palette. Impeccable's
detector flags `cream-palette` and `overused-font`. **All of it is advisory here.** Collect the
suggestions and hand them to me at the end as a separate optional list. Do not implement them.

### Phase 3 — Redesign

Lead with `design-taste-frontend`. State your one-line Design Read first.

This is a church site: the audience is visitors deciding whether to show up on Sunday, and the job of
every page is to reduce the anxiety of walking in the door. Warmth and clarity beat cleverness.

With colour and type families fixed, the ambition goes into composition, typographic hierarchy and
scale, spacing rhythm and vertical cadence, section pacing, depth built from the existing palette,
and motion that is coherent rather than abundant. For motion use the `animate` and
`animation-vocabulary` skills; prefer tightening the framer-motion already there over adding more,
and honour `prefers-reduced-motion`.

Work page by page, starting with `/` and the layout. **Improve what is there — do not rewrite from
scratch.** Keep the stack, routing, data fetching, Supabase calls, form actions, SEO components and
analytics exactly as they are. Use the shadcn primitives already installed rather than hand-rolling.
No new dependencies without asking. Do not touch the `dist*` folders — there are ten of them and they
are all stale build output.

### Phase 4 — Verify

1. Re-run the Phase 0 extraction into `.design-lock.new.txt` and diff. The only permitted additions
   are the new `--brand-*` tokens and opacity/lightness derivatives. **Anything else is a bug —
   revert it.** Show me the diff.
2. `npm run build` must pass, and `npx tsc --noEmit` must be clean.
3. Re-run `/impeccable audit`: groups A–D resolved, no new findings.
4. `/impeccable adapt` for small screens, then `/impeccable polish` last.
5. Screenshot every in-scope page at desktop and mobile, before and after, side by side.
6. Report: what changed, what was left alone, the palette diff, and the optional palette suggestions
   you did not act on.

Verify in bounded passes — build, inspect once, fix in one batch, confirm once, stop. Do not loop.

---

## Short version

> Redesign the public pages of this Vibrant Church site (`/`, about, visit, ministries, events, watch,
> give, contact, plus Header/Footer). Keep the brand colours and fonts exactly: navy `#1a365d`, gold
> `#d4a843`, cream `#f5f0e8`, Playfair Display + system-ui + Caveat. Note the CSS tokens in
> `src/index.css` have drifted from those hex values — the **hex is canonical**; first lift it into
> `--brand-*` tokens, swap the ~390 hardcoded literals over with zero visual change, then correct the
> shadcn tokens to match. Then `/impeccable audit` and `/impeccable critique` for a defect list, and
> redesign structure, hierarchy, spacing, type scale and motion with `design-taste-frontend` under
> that lock. Any palette or font suggestion from the skills is advisory — list it, don't apply it.
> Don't touch admin, auth, the PayPal blues or the YouTube red. Finish with `/impeccable adapt` and
> `/impeccable polish`, and prove the colours are unchanged with a before/after diff.
