# Bannerama

Website for Bannerama banner printing: PVC, mesh and roller banners, printed from the customer's own artwork.

- Homepage with a scroll-driven printer video, live-priced order form and artwork upload
- Products page with price per m², a price list, and per-product upload panels
- No dependencies: plain HTML, CSS and JavaScript with a small Node server

## Run it

```bash
npm start
```

Then open http://localhost:3001.

## Where things live

| Path | What it is |
|---|---|
| `server.js` | Serves the site, receives artwork uploads, saves orders. Prices are in `PRICING`. |
| `public/index.html` | Homepage and order form |
| `public/products.html` | Products page |
| `public/pricing.js` | Price maths shared by both pages |
| `public/media/printer/` | Frames for the scroll video |
| `public/fonts/` | Add the licensed Druk Condensed web fonts here |

Uploaded artwork goes to `uploads/` and orders to `data/orders.json`. Both are created on first run and kept out of git.
