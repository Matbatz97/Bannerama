# Bannerama website: guide for coding agents

Bannerama is a UK banner printing business. This site sells PVC banners, mesh banners and roller banners printed from the customer's own uploaded artwork.

Live site: https://bannerama.vercel.app (deploys automatically from `main` on GitHub: Matbatz97/Bannerama)

## Run it

```bash
npm start        # http://localhost:3001
npm run dev      # same, restarts on server.js changes
```

No dependencies and no build step. Plain HTML, CSS and JavaScript plus one Node server (Node 18+, ES modules). Do not add a framework, bundler or npm packages unless the user asks.

## Files

| Path | What it does |
|---|---|
| `server.js` | Serves `public/`, receives artwork uploads (`POST /api/artwork`, raw body, `X-Filename` header), returns artwork info and previews (`GET /api/artwork/:id`, `/preview`), prices (`GET /api/pricing`, `POST /api/quote`), saves orders (`POST /api/orders`). **Prices live in `PRICING` here.** |
| `public/index.html` | Homepage: hero, scroll video, statement, order form (`#order`), sectors, process, callout, artwork guide, contact |
| `public/app.js` | Homepage logic: order form, live price, artwork upload and checks, URL prefill, mobile menu, scroll video |
| `public/products.html` | Products page: price list (`#prices`), one section per banner type (`#pvc`, `#mesh`, `#roller`), each with an order panel |
| `public/pvc-banners.html`, `mesh-banners.html`, `roller-banners.html` | One page per banner type: price per m² badge, calculator and upload panel, popular sizes table, specs |
| `public/sectors.html`, `how-it-works.html`, `artwork-help.html`, `contact.html` | Info pages linked from the main menu |
| `public/products.js` | Logic for the products page and the banner pages: price panels, artwork upload, price list and size tables |
| `public/site.js` | Loaded on every page: mobile menu, Products dropdown, footer year, contact form (opens the email app) |
| `public/pricing.js` | Price maths shared by both pages (`DEFAULT_PRICING`, `priceBanner`, `gbp`, `pocketMetres`) |
| `public/styles.css` | All styles for both pages |
| `public/media/printer/000-140.webp` | 141 frames of the printer video, drawn on a canvas as the page scrolls |
| `public/fonts/` | Licensed Druk Condensed web fonts go here (not included yet) |
| `public/logo-mark.svg` | B mark, used as the favicon |
| `uploads/`, `data/orders.json` | Created at runtime. Customer data: never commit (already in `.gitignore`) |

## Rules that must stay true

### Pricing
- Three places compute prices and must always agree: `quote()` in `server.js`, `priceBanner()` in `public/pricing.js`, and `PRICING` / `DEFAULT_PRICING`. Change all of them together.
- The server recalculates every order's price. Never trust a price sent from the browser.
- PVC and mesh are priced per m² with a minimum charge. Scaffold pockets are priced per metre of pocket. Roller banners are a fixed price per size, plus a premium stand option. VAT is 20%.

### Ordering flow
- Products page panels link to the homepage form with URL params: `/?type=pvc&w=300&h=100&finishing=scaffold&pocketEdges=topbottom&art=<uploadId>#order`. `app.js` reads these to prefill the form. Keep both ends in sync if you rename a field.
- Banner types: `pvc`, `mesh`, `roller`. Finishing: `eyelets`, `scaffold`, `hemmed`. Pocket edges: `topbottom`, `sides`, `all`. Roller sizes: `850x2000`, `1000x2000`, `1200x2000`. Stands: `standard`, `premium`.
- Accepted artwork: PDF, AI, EPS, SVG, TIFF, PNG, JPG, up to 250 MB. Previews are served only for PNG and JPG (never SVG or PDF) for security.

### Brand
- Colours (CSS variables in `styles.css`): Banner Yellow `#FFE600` (page background), Electric Purple `#6A00FF`, Cobalt Blue `#0027FF`, Soft Neutral `#F6F6F2`, navy ink `#120E6B`. Do not introduce other colours.
- Typeface: Druk Condensed for everything, via `--display` and `--body`. Anton is the free stand-in until the Druk files are added. No other fonts.
- Logos are inline SVG symbols at the top of each HTML page: `#fold-n` (the folded N in the BANNERAMA wordmark) and `#b-mark` (the B with a yellow fold). Reuse them with `<svg><use href="#b-mark"/></svg>`. Every page carries a copy of these symbols, so edit them all.
- Never put a yellow element directly on the yellow page background. Put it inside a purple, navy or white surface.
- Copy is short, confident and plain British English. Brand lines: "Big banners. Bigger ideas.", "Print banners for a brighter world.", "Same messages. Bigger places."

### Code style
- Match the existing code: small functions, `const`/`let`, no semicolon-free style, comments only where the reason isn't obvious.
- Every page repeats the same header (with the Products dropdown) and footer. Change a link in one, change it in all of them.
- Keep it responsive. The layout is checked at desktop (1440px) and phone width (about 400px). Respect `prefers-reduced-motion`.

## Known limits
- **Vercel storage:** on Vercel, `server.js` writes to `/tmp`, which is wiped regularly, and request bodies over about 4.5 MB are rejected. The live site cannot reliably take uploads or orders yet. The planned fix is Vercel Blob storage for artwork and orders.
- Phone number `0800 000 0000` and `hello@bannerama.co.uk` are placeholders.
- Prices and product specs are placeholders for the owner to confirm.
- No payments or order notification emails yet.

## Checking your work
- Run `node --check` on any JS file you edit.
- Start the server and load `/`, `/products.html` and `/api/pricing`.
- If you touch pricing, compare a total on the products page with the same banner in the homepage form. They must match.
