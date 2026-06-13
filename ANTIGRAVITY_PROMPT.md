# Lyallpur Smart City — Housing Scheme Management System (Demo)
## Antigravity IDE Build Prompt

---

## OBJECTIVE

Build a pixel-perfect, fully functional frontend demo for "Lyallpur Smart City" — a real Pakistani housing scheme in Faisalabad. This is a sales demo to present to the scheme's owner in a business meeting. It must look institutional, trustworthy, and immediately understandable by a non-technical Pakistani real estate developer. Every label, number, and name must reflect Pakistani real estate context (PKR currency, Pakistani names, local plot terminology). There is no backend — all data is hardcoded seed data in a single `/lib/data.ts` file.

---

## TECH STACK

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v3 with a custom theme extending the design tokens below
- **UI Components:** shadcn/ui (install: npx shadcn@latest init — use "New York" style, CSS variables OFF, use direct hex values)
- **Icons:** lucide-react
- **Charts:** recharts (for revenue trend on dashboard)
- **Fonts:** Inter from Google Fonts via next/font/google
- **Deployment target:** Vercel (ensure next.config.js is clean, no issues)

---

## DESIGN SYSTEM — EXACT TOKENS

Map these as Tailwind custom colors in `tailwind.config.ts`. Reference them throughout as `bg-ds-*`, `text-ds-*`, `border-ds-*`.

```ts
// tailwind.config.ts — extend colors:
colors: {
  ds: {
    // Surfaces
    'bg':                  '#f8f9ff',
    'surface':             '#ffffff',
    'surface-low':         '#eff4ff',
    'surface-container':   '#e5eeff',
    'surface-high':        '#dce9ff',
    'surface-highest':     '#d3e4fe',
    'surface-dim':         '#cbdbf5',
    // Text
    'on-surface':          '#0b1c30',
    'on-surface-variant':  '#45464d',
    'inverse-surface':     '#213145',
    'inverse-on-surface':  '#eaf1ff',
    // Borders
    'outline':             '#76777d',
    'outline-variant':     '#c6c6cd',
    // Primary (Deep Navy — sidebar, headings, table headers)
    'primary':             '#131b2e',
    'primary-dim':         '#0F172A',
    'on-primary':          '#ffffff',
    'primary-container':   '#1e2a40',
    'on-primary-container':'#7c839b',
    'primary-fixed':       '#dae2fd',
    // Secondary (Teal — actions, positive states, CTAs)
    'secondary':           '#006a61',
    'secondary-dark':      '#005049',
    'on-secondary':        '#ffffff',
    'secondary-container': '#86f2e4',
    'on-secondary-container':'#006f66',
    'secondary-fixed':     '#89f5e7',
    'secondary-fixed-dim': '#6bd8cb',
    // Tertiary (Amber — warnings, pending, booked plots)
    'tertiary':            '#b87500',
    'on-tertiary':         '#ffffff',
    'tertiary-container':  '#ffddb8',
    'on-tertiary-container':'#653e00',
    // Error (Red — overdue, sold conflict)
    'error':               '#ba1a1a',
    'on-error':            '#ffffff',
    'error-container':     '#ffdad6',
    'on-error-container':  '#93000a',
  }
}

// Border radius:
borderRadius: {
  'none': '0',
  'sm':   '2px',
  DEFAULT:'4px',
  'md':   '6px',
  'lg':   '8px',
  'xl':   '12px',
  'full': '9999px',
}
```

### Typography Rules
- Font: `Inter` (Google Fonts, weights: 400, 500, 600, 700)
- KPI numbers on cards: `text-[32px] font-semibold leading-[40px] tracking-[-0.01em]`
- Section headings: `text-[20px] font-semibold leading-[28px]`
- Table headers: `text-[12px] font-medium uppercase tracking-[0.05em]`
- Table rows: `text-[14px] font-normal leading-[20px]`
- Body text: `text-[16px] font-normal leading-[24px]`
- Small labels/captions: `text-[12px] font-medium`

### Elevation Rules
- Background: `bg-ds-bg`
- Cards: `bg-ds-surface border border-[#E2E8F0] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] rounded-lg`
- Modals/panels: same as cards but `shadow-[0px_10px_25px_-3px_rgba(0,0,0,0.15)]`

---

## PROJECT STRUCTURE

```
/app
  layout.tsx              ← root layout, Inter font, body bg-ds-bg
  /dashboard
    page.tsx
  /plot-map
    page.tsx
  /installments
    page.tsx
/components
  Sidebar.tsx             ← shared sidebar
  TopBar.tsx              ← shared top bar
  AppShell.tsx            ← wraps Sidebar + TopBar + main content slot
  /dashboard
    KpiCard.tsx
    RevenueChart.tsx
    RecentBookingsTable.tsx
    BlockSummary.tsx
  /plot-map
    PlotGrid.tsx
    PlotCell.tsx
    PlotDetailPanel.tsx
  /installments
    InstallmentTable.tsx
    WhatsAppReminderModal.tsx
    CollectionSummary.tsx
/lib
  data.ts                 ← ALL seed data
  types.ts                ← TypeScript interfaces
  utils.ts                ← formatPKR(), formatDate(), cn()
```

---

## SEED DATA — `/lib/data.ts`

### Scheme Identity
```ts
export const SCHEME = {
  name: 'Lyallpur Smart City',
  tagline: 'Canal Expressway, Faisalabad',
  developer: 'Marwa Developers',
  chairman: 'Malik Mudassar Ali',
  pricePerMarla: 850000,
  currency: 'PKR',
}
```

### Plot Blocks & Inventory
```ts
// Plot sizes with marla count and derived price
export const PLOT_TYPES = {
  '5-Marla':  { marla: 5,  price: 4250000,  label: '5 Marla'  },
  '10-Marla': { marla: 10, price: 8500000,  label: '10 Marla' },
  '1-Kanal':  { marla: 20, price: 17000000, label: '1 Kanal'  },
  '4-Marla-C':{ marla: 4,  price: 3400000,  label: '4 Marla (Comm.)' },
  '6-Marla-C':{ marla: 6,  price: 5100000,  label: '6 Marla (Comm.)' },
}

// Generate plots per block with realistic status distribution
export const BLOCKS = [
  {
    id: 'overseas',
    name: 'Overseas Block',
    description: 'Dedicated to overseas Pakistani investors',
    totalPlots: 48,
    plotType: '10-Marla',
    // Distribution: 50% available, 30% booked, 20% sold
  },
  {
    id: 'executive',
    name: 'Executive Block',
    description: 'Premium residential plots',
    totalPlots: 60,
    plotType: '1-Kanal',
    // Distribution: 55% available, 25% booked, 20% sold
  },
  {
    id: 'general',
    name: 'General Block',
    description: 'Affordable residential plots for families',
    totalPlots: 80,
    plotType: '5-Marla',
    // Distribution: 60% available, 25% booked, 15% sold
  },
  {
    id: 'commercial',
    name: 'Commercial Block',
    description: 'Commercial plots for businesses and investment',
    totalPlots: 24,
    plotType: '4-Marla-C',
    // Distribution: 45% available, 35% booked, 20% sold
  },
]
// Total: 212 plots
```

### Buyers Seed Data (20 buyers for installments + recent bookings)
```ts
export const BUYERS = [
  { id: 'B001', name: 'Ahmed Raza Khan',     cnic: '33100-1234567-1', phone: '+92 300 1234567', city: 'Faisalabad', type: 'local' },
  { id: 'B002', name: 'Fatima Malik',         cnic: '33100-2345678-2', phone: '+92 321 2345678', city: 'Faisalabad', type: 'local' },
  { id: 'B003', name: 'Muhammad Usman Tariq', cnic: '33100-3456789-3', phone: '+92 311 3456789', city: 'Dubai, UAE',  type: 'overseas' },
  { id: 'B004', name: 'Zainab Baig',          cnic: '33100-4567890-4', phone: '+92 333 4567890', city: 'Lahore',     type: 'local' },
  { id: 'B005', name: 'Muhammad Waqas',       cnic: '33100-5678901-5', phone: '+92 345 5678901', city: 'Faisalabad', type: 'local' },
  { id: 'B006', name: 'Sara Khan',            cnic: '33100-6789012-6', phone: '+92 300 6789012', city: 'London, UK', type: 'overseas' },
  { id: 'B007', name: 'Bilal Ahmed Sheikh',   cnic: '33100-7890123-7', phone: '+92 321 7890123', city: 'Faisalabad', type: 'local' },
  { id: 'B008', name: 'Ayesha Noor',          cnic: '33100-8901234-8', phone: '+92 311 8901234', city: 'Karachi',    type: 'local' },
  { id: 'B009', name: 'Hassan Ali Mirza',     cnic: '33100-9012345-9', phone: '+92 333 9012345', city: 'Riyadh, KSA',type: 'overseas' },
  { id: 'B010', name: 'Imran Sheikh',         cnic: '33100-0123456-0', phone: '+92 345 0123456', city: 'Faisalabad', type: 'local' },
  { id: 'B011', name: 'Sana Iqbal',           cnic: '33100-1122334-1', phone: '+92 300 1122334', city: 'Gujranwala', type: 'local' },
  { id: 'B012', name: 'Tariq Mahmood',        cnic: '33100-2233445-2', phone: '+92 321 2233445', city: 'Faisalabad', type: 'local' },
]
```

### Installments Data (12 records, mix of statuses)
```ts
export const INSTALLMENTS = [
  { id: 'INS001', buyerId: 'B001', plotRef: 'OVS-012', block: 'Overseas Block', plotType: '10-Marla',
    totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694,
    dueDate: '2024-05-10', paidDate: null, status: 'overdue',
    reminderSent: false, installmentNo: 4, totalInstallments: 36 },
  { id: 'INS002', buyerId: 'B002', plotRef: 'GEN-034', block: 'General Block', plotType: '5-Marla',
    totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847,
    dueDate: '2024-05-28', paidDate: null, status: 'overdue',
    reminderSent: true, installmentNo: 2, totalInstallments: 36 },
  { id: 'INS003', buyerId: 'B003', plotRef: 'OVS-007', block: 'Overseas Block', plotType: '10-Marla',
    totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694,
    dueDate: '2024-05-15', paidDate: null, status: 'overdue',
    reminderSent: false, installmentNo: 3, totalInstallments: 36 },
  { id: 'INS004', buyerId: 'B004', plotRef: 'EXE-021', block: 'Executive Block', plotType: '1-Kanal',
    totalAmount: 17000000, downPayment: 4250000, monthlyAmount: 351389,
    dueDate: '2024-06-20', paidDate: null, status: 'upcoming',
    reminderSent: false, installmentNo: 1, totalInstallments: 36 },
  { id: 'INS005', buyerId: 'B005', plotRef: 'GEN-056', block: 'General Block', plotType: '5-Marla',
    totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847,
    dueDate: '2024-06-25', paidDate: null, status: 'upcoming',
    reminderSent: false, installmentNo: 2, totalInstallments: 36 },
  { id: 'INS006', buyerId: 'B006', plotRef: 'OVS-031', block: 'Overseas Block', plotType: '10-Marla',
    totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694,
    dueDate: '2024-06-28', paidDate: null, status: 'upcoming',
    reminderSent: true, installmentNo: 5, totalInstallments: 36 },
  { id: 'INS007', buyerId: 'B007', plotRef: 'COM-008', block: 'Commercial Block', plotType: '4-Marla-C',
    totalAmount: 3400000, downPayment: 850000, monthlyAmount: 70278,
    dueDate: '2024-07-05', paidDate: null, status: 'upcoming',
    reminderSent: false, installmentNo: 1, totalInstallments: 36 },
  { id: 'INS008', buyerId: 'B008', plotRef: 'EXE-015', block: 'Executive Block', plotType: '1-Kanal',
    totalAmount: 17000000, downPayment: 4250000, monthlyAmount: 351389,
    dueDate: '2024-05-01', paidDate: '2024-04-29', status: 'paid',
    reminderSent: false, installmentNo: 3, totalInstallments: 36 },
  { id: 'INS009', buyerId: 'B009', plotRef: 'OVS-003', block: 'Overseas Block', plotType: '10-Marla',
    totalAmount: 8500000, downPayment: 2125000, monthlyAmount: 175694,
    dueDate: '2024-05-18', paidDate: '2024-05-17', status: 'paid',
    reminderSent: false, installmentNo: 6, totalInstallments: 36 },
  { id: 'INS010', buyerId: 'B010', plotRef: 'GEN-072', block: 'General Block', plotType: '5-Marla',
    totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847,
    dueDate: '2024-05-22', paidDate: '2024-05-22', status: 'paid',
    reminderSent: false, installmentNo: 4, totalInstallments: 36 },
  { id: 'INS011', buyerId: 'B011', plotRef: 'GEN-041', block: 'General Block', plotType: '5-Marla',
    totalAmount: 4250000, downPayment: 1062500, monthlyAmount: 87847,
    dueDate: '2024-06-30', paidDate: null, status: 'upcoming',
    reminderSent: false, installmentNo: 1, totalInstallments: 36 },
  { id: 'INS012', buyerId: 'B012', plotRef: 'EXE-044', block: 'Executive Block', plotType: '1-Kanal',
    totalAmount: 17000000, downPayment: 4250000, monthlyAmount: 351389,
    dueDate: '2024-05-05', paidDate: null, status: 'overdue',
    reminderSent: true, installmentNo: 2, totalInstallments: 36 },
]
```

### Dashboard KPI Derivations
```ts
// Calculate from seed data — hardcode results directly:
export const DASHBOARD_STATS = {
  totalPlots: 212,
  plotsSold: 38,
  plotsBooked: 56,
  plotsAvailable: 118,
  collectionsThisMonth: 3847000,   // PKR
  collectionTarget: 5200000,        // PKR
  overdueAccounts: 4,
  overdueAmount: 790825,            // PKR (sum of overdue installments)
  totalRevenue: 42500000,           // PKR (cumulative bookings value)
  agentsActive: 14,
}
```

### Recent Bookings (for dashboard table)
```ts
export const RECENT_BOOKINGS = [
  { id: 'BK001', buyerName: 'Hassan Ali Mirza', plotRef: 'OVS-003', block: 'Overseas', type: '10 Marla', amount: 8500000, date: '2024-05-30', status: 'confirmed' },
  { id: 'BK002', buyerName: 'Fatima Malik',      plotRef: 'GEN-034', block: 'General',  type: '5 Marla',  amount: 4250000, date: '2024-05-28', status: 'pending' },
  { id: 'BK003', buyerName: 'Bilal Ahmed Sheikh', plotRef: 'EXE-021', block: 'Executive',type: '1 Kanal',  amount: 17000000,date: '2024-05-25', status: 'confirmed' },
  { id: 'BK004', buyerName: 'Sara Khan',          plotRef: 'OVS-031', block: 'Overseas', type: '10 Marla', amount: 8500000, date: '2024-05-22', status: 'confirmed' },
  { id: 'BK005', buyerName: 'Tariq Mahmood',      plotRef: 'COM-008', block: 'Commercial',type:'4 Marla',  amount: 3400000, date: '2024-05-20', status: 'pending' },
  { id: 'BK006', buyerName: 'Sana Iqbal',         plotRef: 'GEN-056', block: 'General',  type: '5 Marla',  amount: 4250000, date: '2024-05-18', status: 'cancelled' },
]
```

### Revenue Chart Data (7 months)
```ts
export const REVENUE_TREND = [
  { month: 'Dec',  bookings: 12500000, collections: 8200000  },
  { month: 'Jan',  bookings: 18700000, collections: 11400000 },
  { month: 'Feb',  bookings: 14200000, collections: 9800000  },
  { month: 'Mar',  bookings: 21500000, collections: 14600000 },
  { month: 'Apr',  bookings: 19800000, collections: 13200000 },
  { month: 'May',  bookings: 28400000, collections: 17900000 },
  { month: 'Jun',  bookings: 38600000, collections: 21400000 },
]
```

---

## COMPONENT SPECIFICATIONS

### Shared: `AppShell.tsx`
Full-height layout: `flex h-screen overflow-hidden bg-ds-bg`.
Left: `<Sidebar />` fixed 260px wide.
Right: flex-col — `<TopBar />` fixed height 64px, then `<main>` scrollable with `overflow-y-auto`.

---

### `Sidebar.tsx`
```
Background: bg-ds-primary-dim (#0F172A)
Width: 260px, full height, flex-col
Padding: p-0

— HEADER SECTION (top, p-6):
  Logo area:
    Row: small building icon (lucide: Building2, 20px, text-ds-secondary)
    + text "Lyallpur Smart City" (text-[13px] font-semibold text-white leading-tight)
    + below: "Management Portal" (text-[11px] text-ds-on-primary-container)

— NAV SECTION (flex-1, pt-4):
  Section label: "MAIN MENU" — text-[10px] font-medium text-ds-on-primary-container
                  tracking-[0.1em] uppercase px-4 mb-2
  Nav items (each):
    height: 44px, px-3, mx-2, rounded-lg, flex items-center gap-3
    Icon: 18px
    Label: text-[14px] font-medium

  Active state:
    Left teal bar: absolute 3px wide, full height, bg-ds-secondary, rounded-r-sm
    Background: bg-white/10
    Text + icon: text-white

  Inactive state:
    Text + icon: text-ds-on-primary-container (#7c839b)
    Hover: bg-white/5

  Nav items (in order):
    1. Dashboard     → icon: LayoutDashboard  → href: /dashboard
    2. Plot Map      → icon: Map              → href: /plot-map
    3. Installments  → icon: CreditCard       → href: /installments
    4. Agents        → icon: Users            → href: /agents (placeholder, just nav)
    5. Reports       → icon: BarChart3        → href: /reports (placeholder)
    6. Settings      → icon: Settings         → href: /settings (placeholder)

— FOOTER (bottom, p-4, border-t border-white/10):
  User row: flex items-center gap-3
    Avatar: 36px circle, bg-ds-secondary, white initials "MA"
    Name: "Malik Mudassar" text-[13px] font-medium text-white
    Role: "Chairman" text-[11px] text-ds-on-primary-container
    Right: LogOut icon (16px, text-ds-on-primary-container, cursor-pointer)
```

---

### `TopBar.tsx`
```
Height: 64px, bg-ds-surface, border-b border-[#E2E8F0]
px-6, flex items-center justify-between

LEFT:
  Page title — dynamically show current page name
  Text: text-[20px] font-semibold text-ds-on-surface
  Below: breadcrumb — "Lyallpur Smart City / [Page Name]"
         text-[12px] text-ds-on-surface-variant

RIGHT (flex items-center gap-4):
  1. Search bar (hidden on mobile):
     w-64 h-9, border border-ds-outline-variant rounded
     placeholder "Search plots, buyers..." text-[13px]
     Leading search icon in teal
  2. Notification bell icon (Bell, 20px)
     Badge: small red dot with "3" count
  3. Help icon (HelpCircle, 20px, text-ds-on-surface-variant)
  4. Divider: h-6 w-px bg-ds-outline-variant
  5. User chip:
     Avatar 32px circle bg-ds-primary-dim, initials "MA" text-white text-[12px]
     Name: "Malik Mudassar" text-[13px] font-medium
     Role: "Chairman" text-[11px] text-ds-on-surface-variant
```

---

## PAGE 1 — `/dashboard`

### Layout
```
Padding: p-6, flex flex-col gap-6
Max width: 1440px, mx-auto
```

### Section A — KPI Cards (4 cards, grid-cols-4 gap-4)

**Card anatomy:**
```
bg-ds-surface, rounded-lg, border border-[#E2E8F0]
shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]
p-5, flex flex-col gap-1
Top accent: 3px solid border at very top of card (use teal or navy)

Each card:
  Row 1: LABEL (text-[11px] font-medium uppercase tracking-[0.05em] text-ds-on-surface-variant)
       + icon on right (18px, colored)
  Row 2: VALUE (text-[32px] font-semibold leading-[40px] tracking-[-0.01em])
  Row 3: TREND or CONTEXT (text-[12px])
```

**Card 1 — Total Bookings Value**
- Label: TOTAL SALES VALUE
- Icon: TrendingUp (text-ds-secondary)
- Value: `PKR 4.25 Cr` (text-ds-on-surface)
- Context: `↑ 12% vs last month` (text-green-600)
- Top accent: bg-ds-secondary

**Card 2 — Collections This Month**
- Label: COLLECTED THIS MONTH
- Icon: Wallet (text-ds-secondary)
- Value: `PKR 38.47 L`
- Context: Progress bar below value: 74% of PKR 52L target (teal fill, ds-surface-container bg, h-1.5 rounded-full)
- Top accent: bg-ds-secondary

**Card 3 — Overdue Amount**
- Label: OVERDUE AMOUNT
- Icon: AlertTriangle (text-ds-error)
- Value: `PKR 7.91 L` (text-ds-error)
- Context: `4 accounts · 90+ days pending` (text-ds-error/80)
- Top accent: bg-ds-error

**Card 4 — Available Plots**
- Label: AVAILABLE PLOTS
- Icon: MapPin (text-ds-on-surface-variant)
- Value: `118 Units`
- Context: `Out of 212 total · 56 booked` (text-ds-on-surface-variant)
- Top accent: bg-ds-primary-dim

---

### Section B — Two Column Row (grid grid-cols-3 gap-4)

**Left (col-span-2): Revenue Trend Chart**
```
Card: bg-ds-surface, rounded-lg, border, shadow, p-5
Header: "Revenue Trend" (text-[18px] font-semibold) + legend right (two dots: teal=Bookings, navy=Collections)
Chart: recharts AreaChart, height 220px
  Two areas: Bookings (fill: ds-secondary, opacity 0.15, stroke: ds-secondary)
             Collections (fill: ds-primary-dim, opacity 0.1, stroke: ds-primary-dim, strokeDasharray: "4 4")
  XAxis: month labels, text-[11px]
  YAxis: hidden
  Tooltip: custom — white card, rounded, shadow, shows both values in PKR L
  No grid lines — use only horizontal CartesianGrid with opacity 0.3
```

**Right (col-span-1): Block Summary**
```
Card: bg-ds-surface, rounded-lg, border, shadow, p-5
Title: "Inventory by Block" (text-[15px] font-semibold)
4 rows (one per block):

Each row:
  Block name (text-[13px] font-medium) + total plots right
  Progress bar: full width, h-2, rounded-full
    Segments: green=sold%, amber=booked%, light=available%
  Below bar: small stat pills — "38 Sold · 22 Booked · 8 Available" (text-[11px])
  Divider between rows

Block data:
  Overseas:    10 sold, 14 booked, 24 available  (48 total)
  Executive:   12 sold, 15 booked, 33 available  (60 total)
  General:     12 sold, 20 booked, 48 available  (80 total)
  Commercial:   4 sold,  7 booked, 13 available  (24 total)
```

---

### Section C — Recent Bookings Table (full width)
```
Card: bg-ds-surface, rounded-lg, border, shadow
Header row: p-5, flex justify-between items-center
  Left: "Recent Bookings" (text-[18px] font-semibold)
  Right: "View All →" button (text-ds-secondary text-[13px] font-medium)

Table:
  thead: bg-ds-primary-dim
    Columns: BUYER NAME | PLOT REF | BLOCK | PLOT TYPE | AMOUNT (PKR) | DATE | STATUS
    th: text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3

  tbody: rows height 44px, border-b border-[#F1F5F9]
    Hover: bg-ds-surface-low
    td: text-[14px] text-ds-on-surface px-4 py-2.5

    BUYER NAME column:
      Avatar circle 28px (bg-ds-surface-highest, initials, text-[11px] font-medium text-ds-on-surface)
      + name text right of avatar

    AMOUNT column: font-medium text-ds-on-surface

    STATUS column — status chips (rounded-full, text-[11px] font-medium, px-2.5 py-0.5):
      confirmed:  bg-[#dcfce7] text-[#166534]
      pending:    bg-ds-tertiary-container text-ds-on-tertiary-container
      cancelled:  bg-ds-error-container text-ds-on-error-container

Use RECENT_BOOKINGS seed data. Format date as "30 May 2024". Format amount with commas.
```

---

## PAGE 2 — `/plot-map`

### Layout
```
h-full, flex
Left: main plot area (flex-1, overflow-y-auto, p-6)
Right: detail panel (fixed 360px, slides in when plot selected, bg-ds-surface border-l border-[#E2E8F0] shadow-xl)
```

### Top Controls Bar
```
Below TopBar, sticky, bg-ds-surface border-b border-[#E2E8F0] px-6 py-3
flex items-center justify-between

LEFT:
  "Interactive Plot Map" (text-[20px] font-semibold)

CENTER — Legend pills (flex gap-3):
  ● Available  (bg-[#dcfce7] text-[#166534] rounded-full px-3 py-1 text-[12px] font-medium)
  ● Booked     (bg-ds-tertiary-container text-ds-on-tertiary-container rounded-full px-3 py-1 text-[12px])
  ● Sold       (bg-ds-error-container text-ds-on-error-container rounded-full px-3 py-1 text-[12px])

RIGHT:
  Filter dropdown: "All Blocks ▾" (select, border, rounded, text-[13px], h-9)
  "+ New Booking" button: bg-ds-secondary text-white px-4 h-9 rounded text-[13px] font-medium
                          hover:bg-ds-secondary-dark transition
```

### Plot Grid Area
```
4 block sections, stacked vertically with gap-8
Each block section:

  Block Header:
    Block name: text-[18px] font-semibold text-ds-on-surface
    Subtitle: description text-[13px] text-ds-on-surface-variant
    Right side: "X Available · Y Booked · Z Sold" stat pills (small, colored)
    Scale: "SCALE 1:200" text-[11px] uppercase text-ds-on-surface-variant
    border-b border-[#E2E8F0] pb-3 mb-4

  Plot Grid:
    grid-cols-10 (for General block), grid-cols-8 (Overseas/Executive), grid-cols-6 (Commercial)
    gap-1.5

  Each Plot Cell (PlotCell component):
    Width/height: auto via grid, min-h-[44px]
    Display: centered plot number text
    Border-radius: 4px
    Font: text-[11px] font-semibold
    cursor-pointer

    AVAILABLE:  bg-[#dcfce7] text-[#166534] border border-[#86efac]
                hover: bg-[#bbf7d0] border-[#4ade80] scale-105 transition
    BOOKED:     bg-ds-tertiary-container text-ds-on-tertiary-container border border-[#fbbf24]
                hover: scale-105 transition
    SOLD:       bg-ds-error-container text-ds-on-error-container border border-[#fca5a5]
                hover: scale-105 transition (no action — sold is final)

    On click (available/booked): open PlotDetailPanel with that plot's data
```

### Plot Detail Panel (right side, 360px)
```
Appears when a plot is clicked. Slides in from right (CSS transition: translate-x).
If nothing selected: panel hidden (translate-x-full)

Panel structure:
  Header (p-5, border-b border-[#E2E8F0]):
    "Plot Details" text-[16px] font-semibold
    X close button → closes panel (translate-x-full)

  Selected Plot Badge (p-5, bg-ds-surface-low, border-b):
    "SELECTED PLOT" label-md text-ds-on-surface-variant
    Plot ref large: e.g. "#OVS-012" text-[28px] font-bold text-ds-on-surface
    Two pills: block name (ds-secondary tint) + plot type (ds-primary-fixed tint)
    Price: "PKR 8,500,000" text-[20px] font-semibold text-ds-secondary

  Booking Form (p-5, flex flex-col gap-4) — for Available plots:
    Fields (label above each input, input h-10 border rounded px-3 text-[14px]):
      Buyer Full Name
      CNIC Number (placeholder: 00000-0000000-0)
      Contact Number (placeholder: +92 3XX XXXXXXX)
      Buyer Type (select: Local / Overseas)
      Initial Deposit PKR (placeholder: Min. PKR 1,062,500)

    Payment Breakdown box (bg-ds-surface-container, rounded, p-3):
      Row: "Processing Fee" + "PKR 15,000" right
      Row: "Advance Deposit" + auto-calculated
      Divider
      Row bold: "Total Payable" + bold teal amount

    Button: "Generate Digital Receipt" — full width, h-10, bg-ds-secondary text-white rounded
            text-[14px] font-medium. Below: small text "System will send WhatsApp confirmation to buyer."

  For Sold/Booked plots: show buyer info instead of form
    Buyer name, CNIC masked, phone masked, booking date, status chip
    Button: "View Full History" (secondary outline)
```

---

## PAGE 3 — `/installments`

### Layout
```
p-6, flex flex-col gap-6
```

### WhatsApp Automation Stats Bar
```
Card: bg-ds-surface, rounded-lg, border, p-4
flex items-center gap-6 (or grid-cols-4)

Left (col-span-2):
  Icon: MessageCircle (24px, text-ds-secondary)
  "WhatsApp Automation Logs" text-[15px] font-semibold
  "Real-time tracking of automated payment reminders via official API."
  text-[13px] text-ds-on-surface-variant

Right stats (3 stat columns, dividers between):
  SENT TODAY     → 142  (text-[28px] font-bold text-ds-on-surface)
  SUCCESSFUL     → 138  (text-[28px] font-bold text-[#166534])
  FAILED         → 4    (text-[28px] font-bold text-ds-error)
  Each with its label below in text-[11px] uppercase text-ds-on-surface-variant
```

### Filter Tabs + Controls
```
flex items-center justify-between
Left: Tab row (3 tabs):
  "Overdue" | "Upcoming" | "Paid"
  Active tab: text-ds-secondary, border-b-2 border-ds-secondary, font-medium
  Inactive: text-ds-on-surface-variant
  Each tab: px-4 py-2 text-[14px]

Right:
  "SORT BY" label + "Due Date (Soonest) ▾" dropdown
  "+ Create Invoice" button bg-ds-secondary text-white px-4 h-9 rounded text-[13px]
  "↓ Export PDF" button border border-ds-outline rounded px-4 h-9 text-[13px]
```

### Installments Table
```
Card: bg-ds-surface, rounded-lg, border, shadow overflow-hidden

thead (sticky, bg-ds-primary-dim):
  Columns: BUYER NAME | PLOT / BLOCK | AMOUNT (PKR) | DUE DATE | STATUS | ACTIONS
  th: text-[11px] font-medium uppercase tracking-[0.05em] text-white px-4 py-3

tbody: rows 44px, border-b border-[#F1F5F9], hover:bg-ds-surface-low

  BUYER NAME column:
    Avatar 32px circle (bg varies by buyer), initials, text-[12px]
    + buyer name text-[14px] font-medium text-ds-on-surface
    + below: CNIC masked "331**-*******-*" text-[11px] text-ds-on-surface-variant

  PLOT/BLOCK column:
    Plot ref bold text-[13px] + block name below text-[11px] text-ds-on-surface-variant

  AMOUNT column:
    Monthly amount text-[14px] font-semibold text-ds-on-surface
    + below: "Installment X of 36" text-[11px] text-ds-on-surface-variant

  DUE DATE column:
    Formatted date text-[14px]
    If overdue: red date + "X days overdue" below in text-ds-error text-[11px]

  STATUS chips (rounded text-[11px] font-medium px-2.5 py-0.5):
    overdue:  bg-ds-error-container text-ds-on-error-container
    upcoming: bg-ds-tertiary-container text-ds-on-tertiary-container
    paid:     bg-[#dcfce7] text-[#166534]

  ACTIONS column (flex gap-2):
    Send Reminder button (MessageCircle icon, 16px):
      If not sent: bg-ds-secondary text-white rounded px-2 h-7 — onClick opens WhatsApp Reminder Modal
      If sent: bg-ds-surface-container text-ds-on-surface-variant (greyed out, shows checkmark icon)
    View Details button (Eye icon): border border-ds-outline-variant rounded px-2 h-7

Filter tabs control which rows show:
  Overdue tab: show rows where status === 'overdue'
  Upcoming tab: show rows where status === 'upcoming'
  Paid tab: show rows where status === 'paid'
  Default active tab: 'overdue'

Pagination footer (if >10 rows):
  "Showing 1 to X of Y [Status] Installments" text-[13px]
  Page buttons: < 1 2 3 >
  Active page: bg-ds-primary-dim text-white rounded
```

### WhatsApp Reminder Modal
```
Trigger: clicking "Send Reminder" action button on any overdue row
shadcn Dialog component

Modal: w-[480px], bg-ds-surface, rounded-lg, shadow-xl

Header:
  WhatsApp icon (green, 20px) + "Send Payment Reminder" text-[16px] font-semibold
  X close button

Body:
  Buyer info section (bg-ds-surface-low, rounded, p-4, mb-4):
    Name: full buyer name, text-[15px] font-semibold
    Plot: plot ref + block name
    Overdue: amount in red, "X days overdue"

  "Message Preview" label (text-[12px] uppercase font-medium text-ds-on-surface-variant mb-2)
  Message box (bg-[#dcfce7], rounded, p-4, text-[14px] text-ds-on-surface font-mono leading-relaxed border border-[#86efac]):
    "Assalam o Alaikum [Buyer Name] sahab,

Yeh aapke Lyallpur Smart City plot [PLOT-REF] ki
installment reminder hai.

📍 Plot: [PLOT REF], [BLOCK]
💰 Amount Due: PKR [AMOUNT]
📅 Due Date: [DATE]

Baraye mehربانی payment confirm karein ya
hamse raabta karein.

Shukriya
Lyallpur Smart City Management
📞 +92 311 0088776"

  Sending via: row showing "WhatsApp Business API" + green dot "Connected"

Footer buttons:
  "Cancel" ghost button
  "Send via WhatsApp ✓" bg-[#25D366] text-white font-medium px-6 h-10 rounded
   hover: bg-[#128C7E]

On confirm: close modal, mark reminderSent: true for that installment,
update the action button to show a grey checkmark (reminder sent state)
Use local React state — no backend needed.
```

### Collection Summary Cards (below table, grid-cols-3 gap-4)
```
Card 1 — Collection Efficiency:
  "COLLECTION EFFICIENCY" label-md
  "82.4%" text-[32px] font-semibold text-ds-secondary
  "+2.1% vs last month" text-[13px] text-[#166534]
  Progress bar: full width h-2 rounded bg-ds-surface-container
    Fill: 82.4% bg-ds-secondary

Card 2 — Outstanding Amount:
  "OUTSTANDING AMOUNT" label-md
  "PKR 7.91 L" text-[32px] font-semibold text-ds-error
  "Estimated recovery by end of week: PKR 1.8L" text-[12px] text-ds-on-surface-variant

Card 3 — Action Button:
  Center-aligned, full height flex flex-col justify-center items-center
  Refresh icon (20px) + "Sync Payment Records" button
  border-2 border-ds-secondary text-ds-secondary font-medium px-6 h-12 rounded
  hover: bg-ds-secondary text-white transition
  Below: "Last synced: 2 minutes ago" text-[11px] text-ds-on-surface-variant
```

---

## UTILITY FUNCTIONS — `/lib/utils.ts`

```ts
// Format PKR amounts
export function formatPKR(amount: number): string {
  if (amount >= 10000000) return `PKR ${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000)   return `PKR ${(amount / 100000).toFixed(2)} L`
  return `PKR ${amount.toLocaleString('en-PK')}`
}

// Format PKR full with commas
export function formatPKRFull(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`
}

// Days overdue
export function daysOverdue(dueDateStr: string): number {
  const due = new Date(dueDateStr)
  const now = new Date()
  return Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
}

// Initials from name
export function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
}

// cn() from clsx + tailwind-merge
```

---

## GENERATE PLOT DATA FUNCTION

In `/lib/data.ts`, write a function `generatePlots(block)` that produces an array of plot objects with deterministic status distribution (use index % logic, not Math.random() — so the grid looks the same every render):

```ts
type PlotStatus = 'available' | 'booked' | 'sold'

interface Plot {
  id: string         // e.g. "OVS-001"
  blockId: string
  number: number
  type: string       // '5-Marla' etc.
  price: number
  status: PlotStatus
  buyerId?: string   // if booked/sold
}

// Distribution logic (deterministic):
// index % 10 === 0 → sold
// index % 10 === 1 → sold
// index % 10 === 2 → booked
// index % 10 === 3 → booked
// index % 10 === 4 → booked (for overseas/commercial) or available (for general)
// rest → available
// (adjust per block to hit approximate % targets above)
```

---

## TAILWIND CONFIG ADDITIONS

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: { ds: { /* all tokens above */ } },
      borderRadius: { /* all radii above */ },
      boxShadow: {
        'card': '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)',
        'modal': '0px 10px 25px -3px rgba(0,0,0,0.15), 0px 4px 6px -2px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## NEXT.JS CONFIG

```ts
// next.config.ts
const nextConfig = {}
export default nextConfig
```

## GLOBAL CSS

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

* { box-sizing: border-box; }
html { font-family: 'Inter', sans-serif; }
body { background-color: #f8f9ff; color: #0b1c30; }

/* Scrollbar styling */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #eff4ff; }
::-webkit-scrollbar-thumb { background: #c6c6cd; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #76777d; }
```

---

## ROOT LAYOUT

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['400','500','600','700'] })

export const metadata = {
  title: 'Lyallpur Smart City — Management Portal',
  description: 'Housing Scheme Management System',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

## APP SHELL USAGE IN EACH PAGE

```tsx
// app/dashboard/page.tsx (and similarly for other pages)
import AppShell from '@/components/AppShell'
import DashboardContent from '@/components/dashboard/DashboardContent'

export default function DashboardPage() {
  return (
    <AppShell currentPage="Dashboard">
      <DashboardContent />
    </AppShell>
  )
}
```

---

## FINAL QUALITY CHECKLIST — VERIFY BEFORE COMPLETING

- [ ] All monetary values display in PKR with proper formatting (Cr/L/full)
- [ ] All names are Pakistani — no western names anywhere
- [ ] Scheme name "Lyallpur Smart City" appears in sidebar header and browser tab
- [ ] Plot grid renders with deterministic status (no random)
- [ ] Clicking a plot opens detail panel with correct data
- [ ] WhatsApp modal shows Urdu-English mixed message
- [ ] Send Reminder button updates to "sent" state after clicking confirm
- [ ] Filter tabs on installments page filter correctly
- [ ] Responsive: sidebar collapses to hamburger on mobile (<768px)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Page transitions are smooth (no full reloads)
- [ ] All three nav items are active-highlighted correctly when on their page
- [ ] Revenue chart renders without overflow or cutoff
- [ ] Dark navy table headers are readable (white text on #0F172A)
