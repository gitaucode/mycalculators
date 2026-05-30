# MyCalculators Design System

## Brand Direction

MyCalculators is a clean, practical calculator platform for Kenyan consumers.

The UI should feel:
- modern
- calm
- trustworthy
- lightweight
- practical
- financial-tool focused

It should not feel:
- childish
- overly colorful
- bloated
- dashboard-like
- empty
- generic SaaS template

## Color System

Use these colors consistently.

- Primary green: `#0B5A2A`
- Deep green: `#063F20`
- Soft green background: `#F0FAF4`
- Page background: `#F7FAF8`
- White: `#FFFFFF`
- Dark text: `#0B1020`
- Muted text: `#667085`
- Light border: `#E4E7EC`
- Soft green border: `#CFEBDD`

Danger/debug red should never appear in production UI.

## Category Accent Colors

Primary green is the brand color, but calculator categories may use soft accent colors for faster scanning.

Use accents only for icon backgrounds, category badges, and small decorative highlights. Do not turn entire cards into strong colored blocks.

- Money / M-Pesa / Banking: background `#ECFDF3`, text/icon `#0B5A2A`
- Salary / Tax: background `#FFF4E5`, text/icon `#B54708`
- Loans / Education: background `#EFF6FF`, text/icon `#2563EB`
- Utilities / Electricity: background `#FEF9C3`, text/icon `#CA8A04`
- Car / Import / Transport: background `#FEF2F2`, text/icon `#DC2626`
- Health / Lifestyle: background `#FDF2F8`, text/icon `#DB2777`
- Home / Living / Construction: background `#ECFDF5`, text/icon `#047857`

Buttons should remain primary green. The footer should remain deep green. The homepage hero should remain green-focused.

## Typography

Use one clean sans-serif font across the app.

- Page titles: desktop `40px` to `44px`, mobile `30px` to `32px`, font weight `800`, line height `1.1`
- Homepage hero title: desktop `56px` to `64px`, mobile `38px` to `42px`, font weight `800`, line height `1.05`
- Section headings: desktop `26px` to `32px`, mobile `22px` to `26px`, font weight `800`
- Card titles: `16px` to `18px`, font weight `700`
- Body text: `15px` to `16px`, line height `1.6`
- Small labels: `12px` to `13px`, font weight `600`

Do not make body text smaller than `14px` unless it is a badge, label, or metadata.

## Layout Widths

- Homepage max width: `1180px` to `1280px`
- Calculator page max width: `1120px` to `1180px`

Container rule:
- Use `mx-auto`
- Desktop horizontal padding: `24px`
- Mobile horizontal padding: `16px`

Do not stretch calculator pages too wide.

## Page Width Rules

MyCalculators should use a normal full-width website layout. Do not wrap the entire website in a rounded outer canvas. Do not add page-wide shadows or desktop margins around the whole app.

Header:

- Full browser width
- White background
- Border bottom
- Inner nav content max-width `1280px`

Main:

- Soft page background
- Inner content max-width `1200px` to `1280px`
- Centered using `mx-auto`
- Horizontal padding `16px` mobile, `24px` desktop

Footer:

- Full browser width
- Deep green background
- Inner footer content max-width `1280px`

Layout pattern:

```tsx
<header className="w-full border-b bg-white">
  <div className="mx-auto max-w-[1280px] px-4 sm:px-6">...</div>
</header>

<main className="bg-[#F7FAF8]">
  <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:py-14">...</div>
</main>

<footer className="w-full bg-[#063F20]">
  <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">...</div>
</footer>
```

Only cards and major internal sections should be boxed.

## Spacing Rules

- Header height: `64px`
- Main page top padding: `40px` to `48px`
- Section vertical spacing: `48px` to `56px`
- Hero to calculator content: `32px` to `40px`
- Card gap: `20px` to `24px`
- Card padding: `24px` default
- Large feature card padding: `32px` desktop, `24px` mobile

Do not use huge empty vertical gaps. Do not create large blank areas inside cards just to make cards equal height.

## Card Rules

Default card:
- background: white
- border: `1px solid #E4E7EC`
- border-radius: `20px` to `24px`
- padding: `24px`
- shadow: subtle only

Example Tailwind:

```tsx
rounded-2xl border border-gray-200 bg-white p-6 shadow-sm
```

Cards should feel soft and clean, not heavy.

Do not use strong shadows. Do not use many pastel full-card backgrounds. Use color mostly for icons, badges, accents, and buttons.

## Equal Height Rules

Use equal-height cards only for repeated grids:
- Popular calculators
- Category cards
- How it works cards
- Related calculator cards
- Trust cards

Do not force unequal content sections into equal height if it creates dead space.

For calculator pages:
- Form card and result card may have different heights.
- Use `items-start`, not `items-stretch`, for the main calculator grid.
- Result card can be slightly taller if needed.
- Never leave huge blank space under the form button.

## Calculator Page Layout

Every individual calculator page should follow this structure:

1. Header
2. Back link
3. Calculator hero
4. Main calculator area
5. How it works
6. Local context / rates / limits strip
7. Related calculators
8. Footer

Desktop calculator grid:
- Left form: 60%
- Right result card: 40%
- gap: `24px`
- align items: start

Tailwind example:

```tsx
grid gap-6 lg:grid-cols-[1.35fr_0.9fr] lg:items-start
```

## Calculator Hero Rules

The hero should include:
- icon block
- calculator title
- category badge
- short description
- small metadata badges

Example:

```txt
M-Pesa Charges
Mobile Money

Calculate transaction fees for sending money, withdrawals, and payments.

Badges:
Updated rates
Kenya-focused
Free to use
```

The hero should be compact. It should not look like the homepage hero.

## Calculator Form Card Rules

Form card should include:
- title
- helper text
- input fields
- primary action button
- small note if needed

The tariff or rate note must live inside the form card or result card. It must never float between sections.

Button:
- background: `#0B5A2A`
- text: white
- height: `44px` to `48px`
- border-radius: `12px`
- full width inside forms

Inputs:
- height: `44px` to `48px`
- border: `#E4E7EC`
- border-radius: `10px` to `12px`
- font-size: `15px`

## Result Card Rules

Every calculator page should have a result card.

Before calculation:
Show a useful empty state.

Example:

```txt
Enter your details in the calculator to see your estimate and breakdown.
```

After calculation:
Show:
- main result
- breakdown rows
- short note/disclaimer

Main result:
- green
- large
- bold

The result card should be compact and information-first. Do not center everything vertically like a poster.

## How It Works Cards

Use 3 cards.

Each card should have:
- number badge
- title
- short description
- optional small icon

Cards should be same height.

Tailwind pattern:

```tsx
grid gap-5 md:grid-cols-3
```

Card:

```tsx
h-full min-h-[130px] rounded-2xl border bg-white p-5
```

## Related Calculator Cards

Use 3 or 4 cards.

Cards should be same height.

Each card:
- title
- short description
- arrow at bottom

Tailwind pattern:

```tsx
h-full min-h-[140px] rounded-2xl border bg-white p-5 flex flex-col justify-between
```

## Footer Rules

Footer uses deep green: `#063F20`.

Footer should have:
- brand column
- popular tools
- categories
- support
- built for Kenya card

Do not make footer too tall. Use balanced padding: `48px` top, `32px` bottom.

## Debug UI Rule

No red debug badges, issue overlays, development buttons, or error widgets should appear in the production UI screenshots.

If such badges are from the development environment, they should be ignored visually but not included in committed UI components.

## Component Discipline

Before creating a new UI style, check if an existing component can be reused.

Preferred components:
- Header
- Footer
- PageContainer
- CalculatorHero
- CalculatorFormCard
- ResultCard
- InfoCard
- RelatedCalculatorCard
- Badge
- Button
- IconBox

Do not duplicate card styling randomly across pages.

## Final UI Check

Before finishing any UI task, verify:

- Are cards aligned?
- Are repeated cards equal height?
- Is there any floating text between sections?
- Is spacing compact but breathable?
- Are all texts readable?
- Are colors consistent?
- Is the page responsive?
- Are routes and calculator logic unchanged?
- Are debug overlays removed?
