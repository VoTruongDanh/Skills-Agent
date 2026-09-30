---
name: stress-test-copy
description: "Reference guide for Stress-Test Copy"
encoding: "UTF-8"
---

# Stress-Test Copy

Replace text content with realistic worst-case copy to expose overflow, truncation, and layout breakage in UI designs.

## Scope

- If the user has layers selected, operate only on text nodes inside those layers.
- If nothing is selected, operate on all text nodes on the current page, skipping hidden layers.

## Step 1 — Detect the domain

Before replacing any text, scan a sample of text nodes (layer names, current content, parent frame names) to infer the product domain. Common domains and their signals:

| Domain | Signals |
|---|---|
| **Fintech / Banking** | "balance", "transaction", "account", "IBAN", "transfer", currency symbols |
| **Healthcare / Medical** | "patient", "diagnosis", "prescription", "dosage", "provider", "EHR" |
| **E-commerce / Retail** | "cart", "product", "shipping", "SKU", "order", "review", "price" |
| **SaaS / Dashboards** | "dashboard", "analytics", "metrics", "users", "settings", "workspace" |
| **Social / Messaging** | "profile", "message", "post", "follower", "comment", "feed" |
| **Travel / Hospitality** | "booking", "itinerary", "flight", "hotel", "check-in", "passenger" |
| **Legal / Compliance** | "contract", "clause", "jurisdiction", "compliance", "regulation" |

If no clear domain emerges, default to **SaaS / Dashboards**. Use the detected domain to inform the replacement copy in Step 3.

## Step 2 — Classify each text node's role

For every text node, read its layer name, current `.characters` value, and parent/sibling context to classify it into a role:

- **Person name** — nodes named "name", "author", "user", "assignee", or containing a capitalized first+last name
- **Username / handle** — starts with "@" or named "handle", "username"
- **Email** — contains "@" and "."
- **Company / org** — named "company", "org", "brand", or appears near a logo
- **Currency / price** — contains "$", "€", "£", or named "price", "amount", "balance", "total"
- **Percentage** — contains "%" or named "change", "growth", "rate"
- **Count / quantity** — purely numeric or named "count", "total", "qty"
- **ID / reference** — named "id", "ref", "order number", "SKU", or alphanumeric pattern
- **Date** — recognizable date format or named "date", "created", "due"
- **Time / timestamp** — contains ":", "AM", "PM" or named "time", "timestamp"
- **Date range** — contains "–", "to", or two dates
- **Relative time** — "ago", "in X days", "just now"
- **Address** — named "address", "location", or multi-line with numbers + street names
- **Phone** — contains phone-like digits or named "phone", "tel"
- **Status / badge** — named "status", "state", "badge", short uppercase/title-case text
- **Tag list / categories** — comma-separated short words or named "tags", "categories"
- **Error / validation** — named "error", "warning", "validation", or starts with "Please", "Must"
- **Title / heading** — large font size relative to siblings, or named "title", "heading", "h1"–"h6"
- **Subtitle** — secondary heading, smaller than title, named "subtitle", "subheading"
- **Body / description** — multi-sentence paragraph or named "description", "body", "bio"
- **Button / CTA** — inside a component or frame that looks like a button, or named "button", "cta", "label"
- **Breadcrumb** — contains ">", "/" separators or named "breadcrumb"
- **Tooltip / helper** — named "tooltip", "hint", "helper"
- **URL / link** — starts with "http" or named "link", "url"
- **Table header** — inside a table-like structure's first row
- **Table cell** — inside a table-like structure, non-header row

If a node's role is ambiguous, pick the category whose edge case is longest.

## Step 3 — Replace with domain-tailored edge-case copy

For each classified node, swap in the longest plausible real-world value. Tailor the content to the detected domain. Every replacement must feel like data a real system could produce — never use lorem ipsum or placeholder text.

### Names & identities
- **Person name:** Fintech → "María de los Ángeles Fernández-O'Brien III"; Healthcare → "Dr. Alexandros Konstantinos Papadopoulos-Worthington, MD, FACC"; Generic → "Bartholomew Rutherford-Christensen-Nakamura Jr."
- **Username:** "@the_real_alexandros_papadopoulos_2024"
- **Email:** "alexandra.konstantinidou-martinez@international-consulting-group.co.uk"
- **Company:** Fintech → "The International Federal Credit Union & Savings Association, N.A."; Healthcare → "Massachusetts General Hospital & Rehabilitation Network, Inc."

### Numeric & financial
- **Currency:** Fintech → "$12,847,293.47 USD" or "€9.284.571,33"; E-commerce → "$1,299,847.99"
- **Percentage:** "−99.97%" or "+10,842.3%"
- **Count:** "2,147,483,647"
- **ID:** Fintech → "IBAN: DE89 3704 0044 0532 0130 00"; E-commerce → "ORD-2024-INTL-00389274-REV3"; Healthcare → "MRN-2024-HOSP-00482917-A3"

### Dates & times
- **Date:** "Wednesday, September 28, 2028"
- **Timestamp:** "11:59:59 PM GMT+13:45"
- **Date range:** "September 28, 2028 – February 14, 2029"
- **Relative:** "11 months, 29 days ago"

### Addresses & locations
- **Address:** "Apartment 24B, 1428 Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch Road, Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu, 87654-321"
- **Phone:** "+44 (0)20 7946 0958 ext. 12345"

### Status & labels
- **Status:** "Pending Manual Review — Escalated to Compliance"
- **Tags:** Domain-appropriate, 5+ comma-separated tags — e.g. Fintech: "Anti-Money Laundering, KYC Verification, PEP Screening, Sanctions Compliance, Enhanced Due Diligence"
- **Error:** "Your password must contain at least 12 characters, including one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)."

### Body & labels
- **Title:** "Quarterly Consolidated Financial Performance Report & Operational Review — EMEA, APAC, and Americas Divisions (FY2028 Q3)"
- **Subtitle:** "Including year-over-year comparisons, adjusted EBITDA, and forward-looking guidance for all operating segments"
- **Body:** Replace with 3–4 dense, realistic sentences using domain-specific terminology, numbers, and long technical terms.
- **Button:** "Download Comprehensive Report (PDF, 847 MB)"
- **Breadcrumb:** "Organization Settings > Team Management > Permissions & Roles > Custom Role Configuration"
- **Tooltip:** "This field accepts ISO 8601 formatted dates with optional timezone offset (e.g., 2028-09-28T23:59:59+13:45). Leave blank to use the organization's default timezone."
- **URL:** "https://dashboard.international-consulting-group.co.uk/reports/2028/q3/consolidated?region=emea&format=detailed"

### Table-specific
- **Column header:** "Year-Over-Year Adjusted Revenue Growth (%)"
- **Cell:** Use the longest realistic value appropriate to the column's data type and domain.

## Step 4 — Handle mixed text styles

Before modifying each text node:

1. Check if the node has multiple style runs (different fonts, weights, or sizes across segments).
2. If it does, load ALL fonts used across all segments with `figma.loadFontAsync()` for each unique `{family, style}` pair.
3. If it does not, load the single font from `node.fontName`.
4. Only then set `node.characters`.

This preserves bold/italic/mixed formatting within a single text layer.

## Step 5 — Report results

After all replacements, log a brief summary:
- Total text nodes replaced
- Number of parent frames affected
- Detected domain

Example: "Replaced 24 text nodes across 3 frames. Detected domain: Fintech."

Take a screenshot of the top-level affected frames so the user can see the result.

## Important rules

- Preserve all original text styles (font, size, weight, color, line height) — only change `.characters`.
- Never use lorem ipsum, "test", or generic placeholder text. Every value must be a plausible worst case.
- Skip text nodes that are hidden or inside hidden parents.
- If a role is unidentifiable, default to a long descriptive sentence relevant to the detected domain.
- Vary the replacements — don't use the exact same edge-case string for multiple nodes of the same role. Generate realistic variations.
