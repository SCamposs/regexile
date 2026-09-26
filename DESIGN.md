---
name: Technical Companion
colors:
  surface: '#0d1419'
  surface-dim: '#0d1419'
  surface-bright: '#333a40'
  surface-container-lowest: '#080f14'
  surface-container-low: '#151c22'
  surface-container: '#192026'
  surface-container-high: '#242b30'
  surface-container-highest: '#2f363b'
  on-surface: '#dce3ea'
  on-surface-variant: '#bdc8ce'
  outline: '#879298'
  outline-variant: '#3e484e'
  primary: '#c9a85e'
  on-primary: '#151109'
  secondary: '#f0bf58'
  on-secondary: '#402d00'
  error: '#ffb4ab'
  error-container: '#93000a'
  background: '#0d1419'
  on-background: '#dce3ea'
typography:
  headline-xl: { fontFamily: Inter, fontSize: 32px, fontWeight: '600', lineHeight: 40px, letterSpacing: -0.02em }
  headline-xl-mobile: { fontFamily: Inter, fontSize: 24px, fontWeight: '600', lineHeight: 32px, letterSpacing: -0.01em }
  headline-lg: { fontFamily: Inter, fontSize: 22px, fontWeight: '600', lineHeight: 28px, letterSpacing: -0.015em }
  headline-md: { fontFamily: Inter, fontSize: 16px, fontWeight: '600', lineHeight: 22px, letterSpacing: -0.01em }
  body-lg: { fontFamily: Inter, fontSize: 15px, fontWeight: '400', lineHeight: 22px }
  body-md: { fontFamily: Inter, fontSize: 13px, fontWeight: '400', lineHeight: 18px }
  body-sm: { fontFamily: Inter, fontSize: 12px, fontWeight: '400', lineHeight: 16px }
  code-lg: { fontFamily: JetBrains Mono, fontSize: 14px, fontWeight: '500', lineHeight: 20px }
  code-md: { fontFamily: JetBrains Mono, fontSize: 12px, fontWeight: '400', lineHeight: 18px }
  code-sm: { fontFamily: JetBrains Mono, fontSize: 11px, fontWeight: '400', lineHeight: 15px }
  label-md: { fontFamily: JetBrains Mono, fontSize: 11px, fontWeight: '500', lineHeight: 14px, letterSpacing: 0.04em }
  label-sm: { fontFamily: JetBrains Mono, fontSize: 10px, fontWeight: '500', lineHeight: 12px, letterSpacing: 0.06em }
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
spacing:
  gutter: 1rem
  gutter-desktop: 1.25rem
  margin: 1rem
  margin-desktop: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

Regexile is a zero-noise utility for second-monitor use during Path of Exile 2 play. Its visual language combines developer-tool precision with subtle grim-fantasy editorial discipline. Geometry is crisp and measured, surfaces stay close to charcoal black, and a single muted antique-gold accent handles interaction, value, and structural anchors.

Avoid synthetic sci-fi HUD styling, faux telemetry, excessive glow, ornate fantasy treatment, glassmorphism, consumer-app pills, and decorative shadows.

## Colors

- Canvas: `#080D11`
- Surface primary: `#0D1419`
- Surface secondary: `#111A20`
- Surface elevated: `#152027`
- Border default: `#223039`
- Border focused: `#A9823D`
- Text primary: `#F1F4F5`
- Text secondary: `#9AA7AD`
- Text muted: `#68767D`
- Interaction gold: `#A9823D`
- Value gold: `#C89B37`
- Gold bright: `#DEA940`
- Danger: `#C95B4B`
- Success: `#5EAD86`

## Typography

Inter drives navigation, descriptions, and controls. Dignitary Grandeur is the preferred display face for farm names and primary headings, with Cormorant Garamond as the compatible fallback until licensed webfont files are available. JetBrains Mono is reserved for regexes, modifier text, counts, keybindings, and technical metadata. Short micro-labels may use uppercase with modest tracking.

## Layout & Spacing

Use a strict 4px baseline. At desktop widths, use a fixed 280–320px sidebar with a fluid workspace and 20px gutters. Between 768px and 1279px, compress outer margins to 16px. Below 768px, use a single-column stream and an accessible slide-over navigation drawer.

Use 4px and 8px spacing within compact reference controls, 8px for related metadata, and 20px between logical blocks. Density should favor rapid scanning without reducing readability.

## Elevation & Depth

Establish depth through tonal layers and 1px structural lines. Primary cards and rows have no shadow. Overlays may use `0 8px 24px -4px rgba(0, 0, 0, 0.65)`. Focus uses a restrained antique-gold outline or inset ring.

## Shapes

Inputs, buttons, chips, and rows use a 4px radius. Structural panes use 6px. Code badges may use 3px. Avoid fully rounded pills.

## Components

### Buttons

- Primary: antique-gold background, near-black text, 4px radius; brighter gold hover and a visible gold focus ring.
- Secondary: secondary surface, structural border, off-white text; elevated hover.
- Gold: transparent gold tint, gold text, gold border; reserved for important combined-copy actions.
- Compact height 28px; standard height 34px.

### Text Inputs & Regex Pattern Bars

Use a 34px inset surface with a 1px border and 4px radius. Regex typography is monospaced and antique gold. Focus changes the border to gold. Long code remains on one line and scrolls within its own region.

### Reference Chips & Filter Tags

Use 11px monospaced labels, 22px height, 3px radius, a secondary surface, and a structural border. Active and value states use a restrained gold tint.

### Scannable Reference Lists

Use compact header bands, thin row separators, and tonal hover states. Copy indicators change to success green after activation.

### Segmented Selectors

Use a canvas container with 2px internal padding. Active items use the elevated surface, off-white text, and a structural border.

### Cards & Group Panels

Use the primary surface, a 1px structural border, and a 4px radius. Header bands may use an internal bottom border and 8px by 12px padding.
