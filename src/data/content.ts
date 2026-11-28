// Central site content store for bestCRM.
// TODO: connect to API — Replace static exports with CMS / Admin API payloads when backend is ready.

export type IconKey =
  | 'users'
  | 'zap'
  | 'compass'
  | 'barChart'
  | 'utensils'
  | 'bedDouble'
  | 'building2'
  | 'flame'
  | 'jar'
  | 'packageCheck'
  | 'settings'
  | 'workflow'
  | 'plug'
  | 'code2'
  | 'lifeBuoy';

export type PastelAccent = 'lavender' | 'pink' | 'blue' | 'green' | 'orange';

export interface ShowcaseRowItem {
  title: string;
  meta: string;
  metric: string;
  status: string;
  tone: 'green' | 'purple' | 'amber' | 'blue';
}

export interface ShowcasePageData {
  id: string;
  navLabel: string;
  pageTitle: string;
  pageSubtitle: string;
  actionLabel: string;
  kpis: { label: string; value: string; delta: string }[];
  tableTitle: string;
  rows: ShowcaseRowItem[];
  widgetTitle: string;
  widgetBars: { label: string; valueLabel: string; percent: number }[];
}

export interface CrmProduct {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  highlights: string[];
  icon: IconKey;
  showcasePages: ShowcasePageData[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  expandedDesc: string;
  benefits: string[];
  accent: PastelAccent;
  icon: IconKey;
}

export interface PricingPlan {
  id: 'starter' | 'professional' | 'enterprise';
  name: string;
  monthlyPrice: number | null;
  yearlyMonthlyEquivalent: number | null;
  priceLabel: string;
  badge?: string;
  highlighted?: boolean;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaType: 'checkout' | 'sales';
}

export interface CompareRow {
  feature: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export const SITE_INFO = {
  brandName: 'bestCRM',
  tagline: 'Ready-Made CRMs for Small Businesses',
  blurb:
    'Purpose-built CRM software tailored for catering, hostels, hotels, karam podi makers, pickle brands, and lunch box businesses.',
  copyright: `© ${new Date().getFullYear()} bestCRM. All rights reserved.`,
  contact: {
    phoneDisplay: '+91 98765 43210',
    phoneHref: 'tel:+919876543210',
    whatsappNumber: '919876543210',
    whatsappUrl: 'https://wa.me/919876543210?text=Hi%20bestCRM%20team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20CRM%20plans.',
    email: 'hello@bestcrm.com',
    address: 'Hyderabad, India',
    hours: 'Mon to Sat, 9:00 AM to 7:00 PM IST',
  },
  // TODO: connect to API — Update with live Play Store & App Store release URLs
  appLinks: {
    googlePlay: '#google-play-app',
    appStore: '#apple-app-store',
  },
  socials: [
    { name: 'LinkedIn', href: 'https://linkedin.com', id: 'linkedin' as const },
    { name: 'Instagram', href: 'https://instagram.com', id: 'instagram' as const },
    { name: 'YouTube', href: 'https://youtube.com', id: 'youtube' as const },
    { name: 'X', href: 'https://x.com', id: 'x' as const },
  ],
};

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Explore Packages', path: '/packages' },
  { label: 'Services', path: '/services' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
];

export const HERO_CONTENT = {
  eyebrow: 'All-in-One CRM Platform',
  title: 'Manage Customers, Sales & Growth with bestCRM',
  description:
    'A powerful, easy-to-use CRM that helps businesses build stronger customer relationships, automate operations, and grow faster.',
  primaryCta: 'Explore Packages',
  secondaryCta: 'Request Demo',
  chips: ['Boost Sales', 'Improve Customer Relationships', 'Grow Your Business'],
  dashboardPreview: {
    greeting: 'Welcome back!',
    subtitle: 'Here is today’s business overview',
    metrics: [
      { label: 'Total Leads', value: '1,248', delta: '+14.2%' },
      { label: 'Deals', value: '320', delta: '+8.6%' },
      { label: 'Revenue', value: '₹24,50,000', delta: '+21.4%' },
    ],
    chartLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    chartValues: [38, 52, 46, 68, 61, 84, 92],
  },
};

export const WHY_CHOOSE_ITEMS = [
  {
    id: 'lead-management',
    title: 'Lead Management',
    description:
      'Capture enquiries from phone, WhatsApp, and walk-ins in one organized pipeline so no customer request slips through.',
    icon: 'users' as IconKey,
    accent: 'lavender' as PastelAccent,
  },
  {
    id: 'sales-automation',
    title: 'Sales Automation',
    description:
      'Automate follow-up reminders, payment nudges, and repeat order alerts so your team spends time closing rather than chasing.',
    icon: 'zap' as IconKey,
    accent: 'blue' as PastelAccent,
  },
  {
    id: 'customer-360',
    title: 'Customer 360°',
    description:
      'See every customer’s order history, preferences, invoices, and pending dues on a single clean profile screen.',
    icon: 'compass' as IconKey,
    accent: 'pink' as PastelAccent,
  },
  {
    id: 'reports-analytics',
    title: 'Reports & Analytics',
    description:
      'Track daily collections, top-selling items, occupancy rates, and monthly revenue growth with clear visual summaries.',
    icon: 'barChart' as IconKey,
    accent: 'green' as PastelAccent,
  },
];

// TODO: connect to API — Fetch active industry CRM catalog from backend
export const CRM_PRODUCTS: CrmProduct[] = [
  {
    id: 'catering-crm',
    name: 'Catering CRM',
    shortDesc:
      'Manage event enquiries, quotes, menus, bookings, advance payments and staff for each event.',
    fullDesc:
      'Built specifically for catering teams handling weddings, corporate events, and house functions. Track every tasting request, lock custom menus, collect milestone advances, and assign kitchen and service staff per event date.',
    tags: ['Event bookings', 'Quotes & invoices', 'Staff scheduling'],
    highlights: [
      'Date-wise event calendar with conflict prevention',
      'Instant menu & per-plate quote generator',
      'Advance payment and balance settlement tracker',
      'Chef, helper, and transport crew assignment per function',
    ],
    icon: 'utensils',
    showcasePages: [
      {
        id: 'overview',
        navLabel: 'Event Overview',
        pageTitle: 'Upcoming Catering Events',
        pageSubtitle: 'Confirmed bookings and enquiry pipeline for this week',
        actionLabel: '+ New Event Quote',
        kpis: [
          { label: 'Events This Month', value: '34', delta: '+18%' },
          { label: 'Confirmed Plates', value: '14,800', delta: '+24%' },
          { label: 'Advances Collected', value: '₹11,40,000', delta: '92% on time' },
        ],
        tableTitle: 'Scheduled Functions',
        rows: [
          { title: 'Rao Wedding Reception', meta: '1,200 Plates · Jubilee Hills', metric: '₹5,40,000', status: 'Advance Paid', tone: 'green' },
          { title: 'TechPark Annual Lunch', meta: '450 Plates · HITEC City', metric: '₹1,62,000', status: 'Menu Locked', tone: 'purple' },
          { title: 'Mehta Housewarming', meta: '180 Plates · Banjara Hills', metric: '₹72,000', status: 'Tasting Due', tone: 'amber' },
          { title: 'Apex Pharma Summit', meta: '320 Plates · Gachibowli', metric: '₹1,28,000', status: 'Confirmed', tone: 'blue' },
        ],
        widgetTitle: 'Kitchen Load by Day',
        widgetBars: [
          { label: 'Friday Evening', valueLabel: '3 Events', percent: 75 },
          { label: 'Saturday Muhurtham', valueLabel: '5 Events', percent: 95 },
          { label: 'Sunday Afternoon', valueLabel: '4 Events', percent: 82 },
        ],
      },
      {
        id: 'menus',
        navLabel: 'Menus & Quotes',
        pageTitle: 'Per-Plate Menu Builder',
        pageSubtitle: 'Custom menu packages and instant PDF quotations',
        actionLabel: 'Send Quote',
        kpis: [
          { label: 'Active Quotes', value: '19', delta: '6 awaiting sign-off' },
          { label: 'Avg. Plate Value', value: '₹485', delta: '+₹35 YoY' },
          { label: 'Quote Win Rate', value: '68%', delta: '+9% this quarter' },
        ],
        tableTitle: 'Recent Menu Quotations',
        rows: [
          { title: 'Royal South Indian Veg', meta: '24 Items · Live Counters', metric: '₹520/plate', status: 'Approved', tone: 'green' },
          { title: 'Corporate Executive Buffet', meta: '16 Items · Tea & Snacks', metric: '₹390/plate', status: 'Sent', tone: 'blue' },
          { title: 'Grand Sangeet Gala', meta: '32 Items · Chaat + Dessert', metric: '₹740/plate', status: 'Drafting', tone: 'amber' },
          { title: 'Traditional Banana Leaf', meta: '18 Items · Silver Service', metric: '₹450/plate', status: 'Approved', tone: 'green' },
        ],
        widgetTitle: 'Top Requested Categories',
        widgetBars: [
          { label: 'Wedding Packages', valueLabel: '58%', percent: 58 },
          { label: 'Corporate Buffets', valueLabel: '27%', percent: 27 },
          { label: 'Home Functions', valueLabel: '15%', percent: 15 },
        ],
      },
      {
        id: 'payments',
        navLabel: 'Advance Payments',
        pageTitle: 'Milestone Billing & Dues',
        pageSubtitle: 'Track booking advances, mid-event payouts, and final balances',
        actionLabel: 'Record Payment',
        kpis: [
          { label: 'Collected This Month', value: '₹18,65,000', delta: '+21%' },
          { label: 'Pending Balances', value: '₹2,45,000', delta: '4 events due' },
          { label: 'GST Invoices Issued', value: '31', delta: '100% synced' },
        ],
        tableTitle: 'Payment Milestones',
        rows: [
          { title: 'Rao Wedding (50% Token)', meta: 'UPI / Bank Transfer', metric: '₹2,70,000', status: 'Cleared', tone: 'green' },
          { title: 'TechPark Annual Lunch', meta: 'Corporate PO #409', metric: '₹81,000', status: 'Due in 2d', tone: 'amber' },
          { title: 'Srinivas Engagement', meta: 'Final Settlement', metric: '₹1,15,000', status: 'Cleared', tone: 'green' },
          { title: 'Lakshmi Naming Ceremony', meta: 'Booking Advance', metric: '₹35,000', status: 'Link Sent', tone: 'purple' },
        ],
        widgetTitle: 'Collection Split',
        widgetBars: [
          { label: 'Booking Advances', valueLabel: '₹8.4L', percent: 68 },
          { label: 'Final Settlements', valueLabel: '₹10.2L', percent: 86 },
          { label: 'Upcoming Dues', valueLabel: '₹2.4L', percent: 34 },
        ],
      },
      {
        id: 'staff',
        navLabel: 'Staff Roster',
        pageTitle: 'Chef & Service Crew Roster',
        pageSubtitle: 'Assign head chefs, servers, and transport vans per event',
        actionLabel: 'Assign Crew',
        kpis: [
          { label: 'Active Crew Today', value: '64', delta: '4 teams deployed' },
          { label: 'Head Chefs Assigned', value: '8', delta: 'Zero clashes' },
          { label: 'Vans Scheduled', value: '6', delta: 'All dispatched' },
        ],
        tableTitle: 'Event Crew Allocation',
        rows: [
          { title: 'Team A · Chef Narayana', meta: '12 Servers · 2 Vans', metric: 'Jubilee Hills', status: 'Assigned', tone: 'green' },
          { title: 'Team B · Chef Imran', meta: '8 Servers · 1 Van', metric: 'HITEC City', status: 'On Route', tone: 'blue' },
          { title: 'Team C · Chef Kavitha', meta: '6 Servers · 1 Van', metric: 'Banjara Hills', status: 'Prep Stage', tone: 'purple' },
          { title: 'Backup Relief Pool', meta: '6 Helpers · Standby', metric: 'Central Kitchen', status: 'Available', tone: 'amber' },
        ],
        widgetTitle: 'Team Utilization',
        widgetBars: [
          { label: 'Kitchen Chefs', valueLabel: '92%', percent: 92 },
          { label: 'Service Stewards', valueLabel: '84%', percent: 84 },
          { label: 'Logistics Fleet', valueLabel: '78%', percent: 78 },
        ],
      },
    ],
  },
  {
    id: 'hostel-crm',
    name: 'Hostel CRM',
    shortDesc:
      'Manage rooms and beds, resident check-in/out, monthly rent, deposits and complaints.',
    fullDesc:
      'Designed for PG hostels, student accommodations, and working-women or men hostels. Keep real-time visibility into vacant beds, automate monthly rent reminders, record security deposits, and resolve maintenance tickets fast.',
    tags: ['Room & bed allocation', 'Rent tracking', 'Resident records'],
    highlights: [
      'Floor, room, and individual bed occupancy map',
      'Automated monthly rent invoicing and due alerts',
      'KYC, guardian contact, and deposit ledger per resident',
      'In-app complaint logging with resolution status',
    ],
    icon: 'bedDouble',
    showcasePages: [
      {
        id: 'dashboard',
        navLabel: 'Hostel Overview',
        pageTitle: 'Occupancy & Rent Snapshot',
        pageSubtitle: 'Real-time bed status and monthly rent collection across blocks',
        actionLabel: '+ Add Resident',
        kpis: [
          { label: 'Occupied Beds', value: '186 / 200', delta: '93% full' },
          { label: 'Rent Collected', value: '₹14,88,000', delta: '94% paid' },
          { label: 'Open Tickets', value: '4', delta: 'Avg. 3h fix' },
        ],
        tableTitle: 'Recent Resident Activity',
        rows: [
          { title: 'Room 204 · Bed B (Arjun K.)', meta: '3-Sharing AC · Monthly Rent', metric: '₹8,500', status: 'Paid', tone: 'green' },
          { title: 'Room 108 · Bed A (Sneha R.)', meta: '2-Sharing · New Check-in', metric: '₹10,500', status: 'KYC Verified', tone: 'blue' },
          { title: 'Room 312 · Bed C (Vikram M.)', meta: '3-Sharing Non-AC', metric: '₹7,000', status: 'Due Today', tone: 'amber' },
          { title: 'Room 402 · Bed A (Priya D.)', meta: 'Single Room · Deposit Held', metric: '₹15,000', status: 'Active', tone: 'purple' },
        ],
        widgetTitle: 'Occupancy by Floor',
        widgetBars: [
          { label: 'Floor 1 (2-Sharing)', valueLabel: '48/50', percent: 96 },
          { label: 'Floor 2 (3-Sharing)', valueLabel: '72/75', percent: 96 },
          { label: 'Floor 3 (Executive)', valueLabel: '66/75', percent: 88 },
        ],
      },
      {
        id: 'rooms',
        navLabel: 'Rooms & Beds',
        pageTitle: 'Floor & Bed Allocation Map',
        pageSubtitle: 'Inspect vacant beds, notice periods, and upcoming check-ins',
        actionLabel: 'Allocate Bed',
        kpis: [
          { label: 'Vacant Beds Now', value: '14', delta: 'Ready to move' },
          { label: 'On Notice Period', value: '6', delta: 'Vacating 30th' },
          { label: 'Upcoming Bookings', value: '9', delta: 'Next 7 days' },
        ],
        tableTitle: 'Room Availability Board',
        rows: [
          { title: 'Room 101 (AC Twin)', meta: 'Floor 1 · 1 of 2 Occupied', metric: '₹10,500/bed', status: '1 Bed Open', tone: 'green' },
          { title: 'Room 205 (3-Sharing)', meta: 'Floor 2 · 3 of 3 Occupied', metric: '₹8,000/bed', status: 'Full', tone: 'purple' },
          { title: 'Room 309 (AC Twin)', meta: 'Floor 3 · Notice Ends 30th', metric: '₹11,000/bed', status: 'Opening Soon', tone: 'amber' },
          { title: 'Room 406 (Single)', meta: 'Floor 4 · Freshly Painted', metric: '₹15,500/bed', status: 'Available', tone: 'blue' },
        ],
        widgetTitle: 'Sharing Mix',
        widgetBars: [
          { label: '2-Sharing AC', valueLabel: '80 Beds', percent: 80 },
          { label: '3-Sharing Standard', valueLabel: '90 Beds', percent: 90 },
          { label: 'Single Executive', valueLabel: '30 Beds', percent: 60 },
        ],
      },
      {
        id: 'rent',
        navLabel: 'Monthly Rent',
        pageTitle: 'Rent & Deposit Ledger',
        pageSubtitle: 'Automated WhatsApp rent invoices, receipts, and security deposits',
        actionLabel: 'Send Reminders',
        kpis: [
          { label: 'Monthly Billed', value: '₹15,82,000', delta: '186 invoices' },
          { label: 'Pending Dues', value: '₹94,000', delta: '11 residents' },
          { label: 'Deposits Held', value: '₹18,60,000', delta: 'Fully tracked' },
        ],
        tableTitle: 'Rent Collection Log',
        rows: [
          { title: 'Rahul Verma · Room 201', meta: 'UPI Auto-Receipt #8921', metric: '₹8,500', status: 'Paid', tone: 'green' },
          { title: 'Divya Nair · Room 104', meta: 'Bank Transfer · Nov Rent', metric: '₹10,500', status: 'Paid', tone: 'green' },
          { title: 'Karthik Rao · Room 315', meta: 'Reminder Sent on WhatsApp', metric: '₹7,500', status: 'Overdue 2d', tone: 'amber' },
          { title: 'Neha Kulkarni · Room 401', meta: 'Security Deposit Refund', metric: '₹12,000', status: 'Scheduled', tone: 'blue' },
        ],
        widgetTitle: 'Collection Speed',
        widgetBars: [
          { label: 'Paid by 5th', valueLabel: '81%', percent: 81 },
          { label: 'Paid by 10th', valueLabel: '94%', percent: 94 },
          { label: 'Pending Action', valueLabel: '6%', percent: 18 },
        ],
      },
      {
        id: 'complaints',
        navLabel: 'Complaints',
        pageTitle: 'Maintenance & Resident Tickets',
        pageSubtitle: 'Track plumbing, Wi-Fi, electrical, and housekeeping requests',
        actionLabel: '+ Log Ticket',
        kpis: [
          { label: 'Resolved This Week', value: '27', delta: '96% SLA met' },
          { label: 'In Progress', value: '4', delta: 'Technician assigned' },
          { label: 'Avg. Resolution', value: '3.2 hrs', delta: '-40% faster' },
        ],
        tableTitle: 'Active Support Tickets',
        rows: [
          { title: 'Room 208 · AC Filter Cleaning', meta: 'Assigned to Ramesh (Tech)', metric: '2 hrs ago', status: 'In Progress', tone: 'blue' },
          { title: 'Floor 3 · Wi-Fi Router Reset', meta: 'Resolved by Admin Desk', metric: 'Yesterday', status: 'Resolved', tone: 'green' },
          { title: 'Room 110 · Tap Washer Fix', meta: 'Plumber Scheduled 4 PM', metric: 'Today', status: 'Scheduled', tone: 'amber' },
          { title: 'Mess Hall · Evening Tea Timing', meta: 'Feedback Acknowledged', metric: 'Today', status: 'Closed', tone: 'purple' },
        ],
        widgetTitle: 'Ticket Categories',
        widgetBars: [
          { label: 'Electrical & AC', valueLabel: '42%', percent: 42 },
          { label: 'Plumbing', valueLabel: '29%', percent: 29 },
          { label: 'Wi-Fi & Housekeeping', valueLabel: '29%', percent: 29 },
        ],
      },
    ],
  },
  {
    id: 'hotel-crm',
    name: 'Hotel CRM',
    shortDesc:
      'Manage room bookings, guest profiles, check-in/out, billing and repeat guests.',
    fullDesc:
      'Tailored for boutique hotels, lodges, and resorts. Handle direct reservations, smooth front-desk check-ins, room-service add-on billing, and personalized offers that turn first-time visitors into repeat guests.',
    tags: ['Reservations', 'Guest profiles', 'Billing'],
    highlights: [
      'Unified booking calendar across room categories',
      'Quick guest ID verification and check-in/check-out flow',
      'Consolidated room tariff, meals, and GST billing',
      'Repeat guest tags and seasonal stay promotions',
    ],
    icon: 'building2',
    showcasePages: [
      {
        id: 'front-desk',
        navLabel: 'Front Desk',
        pageTitle: 'Today’s Arrivals & Departures',
        pageSubtitle: 'Live room status, check-ins, and housekeeping readiness',
        actionLabel: '+ Walk-in Check-in',
        kpis: [
          { label: 'Occupancy Today', value: '84%', delta: '38 / 45 rooms' },
          { label: 'Check-ins Due', value: '11', delta: '7 checked in' },
          { label: 'RevPAR Today', value: '₹3,420', delta: '+15% vs avg' },
        ],
        tableTitle: 'Front Desk Queue',
        rows: [
          { title: 'Suite 301 · Mr. Rajesh Kapoor', meta: '3 Nights · Repeat VIP Guest', metric: '₹18,600', status: 'Checked In', tone: 'green' },
          { title: 'Deluxe 204 · Ms. Meera Iyer', meta: '2 Nights · Direct Website', metric: '₹8,400', status: 'Arriving 2 PM', tone: 'blue' },
          { title: 'Exec 109 · Dr. Anand Rao', meta: '1 Night · Room + Breakfast', metric: '₹4,950', status: 'Checkout Due', tone: 'amber' },
          { title: 'Suite 305 · Horizon Corp', meta: '4 Nights · Corporate Rate', metric: '₹24,000', status: 'Confirmed', tone: 'purple' },
        ],
        widgetTitle: 'Room Category Occupancy',
        widgetBars: [
          { label: 'Deluxe Rooms', valueLabel: '22/25', percent: 88 },
          { label: 'Executive King', valueLabel: '11/14', percent: 79 },
          { label: 'Luxury Suites', valueLabel: '5/6', percent: 83 },
        ],
      },
      {
        id: 'reservations',
        navLabel: 'Room Bookings',
        pageTitle: 'Reservations Calendar',
        pageSubtitle: 'Direct phone, walk-in, and OTA reservations in one calendar',
        actionLabel: '+ New Booking',
        kpis: [
          { label: 'Upcoming 7 Days', value: '74', delta: 'Bookings locked' },
          { label: 'Direct Bookings', value: '62%', delta: 'Zero commission' },
          { label: 'Avg. Stay Length', value: '2.4 Nights', delta: '+0.3 nights' },
        ],
        tableTitle: 'Upcoming Reservations',
        rows: [
          { title: 'Booking #HT-904 · Family Stay', meta: '2 Deluxe Rooms · Dec 02–05', metric: '₹25,200', status: '50% Paid', tone: 'green' },
          { title: 'Booking #HT-905 · TechConf Group', meta: '6 Executive Rooms · Dec 04', metric: '₹52,800', status: 'Proforma Sent', tone: 'purple' },
          { title: 'Booking #HT-906 · Rohan Desai', meta: '1 Suite · Airport Pickup', metric: '₹12,400', status: 'Confirmed', tone: 'blue' },
          { title: 'Booking #HT-907 · Weekend Stay', meta: '1 Deluxe Room · Hold 6 PM', metric: '₹4,200', status: 'Pending Token', tone: 'amber' },
        ],
        widgetTitle: 'Booking Sources',
        widgetBars: [
          { label: 'Direct Phone & Walk-in', valueLabel: '44%', percent: 44 },
          { label: 'Repeat Corporate', valueLabel: '31%', percent: 31 },
          { label: 'Travel Partners', valueLabel: '25%', percent: 25 },
        ],
      },
      {
        id: 'guests',
        navLabel: 'Guest Profiles',
        pageTitle: 'Guest Directory & Preferences',
        pageSubtitle: 'ID verification history, room preferences, and stay frequency',
        actionLabel: 'Send Offer',
        kpis: [
          { label: 'Total Guest Profiles', value: '4,120', delta: '+140 this mo' },
          { label: 'Repeat Guests', value: '38%', delta: 'High loyalty' },
          { label: 'Avg. Guest Rating', value: '4.8 / 5', delta: 'Verified stays' },
        ],
        tableTitle: 'Frequent & VIP Guests',
        rows: [
          { title: 'Rajesh Kapoor · 9 Stays', meta: 'Prefers High Floor · Quiet Wing', metric: '₹1,42,000', status: 'VIP Gold', tone: 'purple' },
          { title: 'Priya Menon · 6 Stays', meta: 'Early Check-in · Veg Breakfast', metric: '₹68,400', status: 'Repeat Guest', tone: 'green' },
          { title: 'Horizon Logistics (Corp)', meta: '14 Employee Stays YTD', metric: '₹2,15,000', status: 'Corporate', tone: 'blue' },
          { title: 'Sandeep Joshi · 3 Stays', meta: 'Last Stay: 45 days ago', metric: '₹24,900', status: 'Re-engage', tone: 'amber' },
        ],
        widgetTitle: 'Loyalty Retention',
        widgetBars: [
          { label: 'Corporate Accounts', valueLabel: '76%', percent: 76 },
          { label: 'Weekend Families', valueLabel: '54%', percent: 54 },
          { label: 'Solo Business', valueLabel: '63%', percent: 63 },
        ],
      },
      {
        id: 'billing',
        navLabel: 'Billing & GST',
        pageTitle: 'Folio Billing & Room Service',
        pageSubtitle: 'Combine room tariff, restaurant orders, laundry, and GST invoices',
        actionLabel: 'Generate Invoice',
        kpis: [
          { label: 'Month Revenue', value: '₹19,40,000', delta: '+16%' },
          { label: 'F&B Add-ons', value: '₹3,12,000', delta: 'Room service' },
          { label: 'GST Filings Ready', value: '100%', delta: 'HSN matched' },
        ],
        tableTitle: 'Recent Guest Folios',
        rows: [
          { title: 'Folio #412 · Suite 301', meta: 'Tariff + Dining + Airport Cab', metric: '₹21,450', status: 'Settled', tone: 'green' },
          { title: 'Folio #413 · Exec 109', meta: 'Tariff + Breakfast · GST Bill', metric: '₹5,544', status: 'Ready', tone: 'blue' },
          { title: 'Folio #414 · Deluxe 202', meta: 'Company Bill-to-Account', metric: '₹14,200', status: 'Invoiced', tone: 'purple' },
          { title: 'Folio #415 · Deluxe 208', meta: 'Extra Bed + Mini Bar', metric: '₹1,850', status: 'Open Folio', tone: 'amber' },
        ],
        widgetTitle: 'Revenue Breakdown',
        widgetBars: [
          { label: 'Room Tariffs', valueLabel: '79%', percent: 79 },
          { label: 'Dining & Kitchen', valueLabel: '16%', percent: 16 },
          { label: 'Laundry & Transfers', valueLabel: '5%', percent: 20 },
        ],
      },
    ],
  },
  {
    id: 'karam-podi-crm',
    name: 'Karam Podi CRM',
    shortDesc:
      'For spice-powder (karam podi) makers; manage customers, repeat orders, batch and stock, pricing by pack size and delivery.',
    fullDesc:
      'Crafted for traditional spice-powder and podi brands selling direct and wholesale. Manage 100g, 250g, 500g, and 1kg pack pricing, monitor batch freshness and raw spice stock, and trigger timely repeat-order reminders.',
    tags: ['Repeat orders', 'Stock & batches', 'Pack-size pricing'],
    highlights: [
      'Variant pricing matrix across jar and pouch weights',
      'Roasting batch numbers, shelf-life, and stock alerts',
      'One-click reorder reminders based on consumption cycle',
      'Local delivery and courier dispatch tracking',
    ],
    icon: 'flame',
    showcasePages: [
      {
        id: 'sales',
        navLabel: 'Sales Overview',
        pageTitle: 'Spice & Podi Order Board',
        pageSubtitle: 'Daily direct-to-home and retail kirana podi orders',
        actionLabel: '+ Create Order',
        kpis: [
          { label: 'Orders This Week', value: '214', delta: '+22%' },
          { label: 'Repeat Customers', value: '71%', delta: 'High reorder' },
          { label: 'Weekly Sales', value: '₹1,84,500', delta: '+19%' },
        ],
        tableTitle: 'Latest Karam Podi Orders',
        rows: [
          { title: 'Nalla Karam & Karivepaku Pack', meta: 'Mrs. Padma · 2 × 500g Jars', metric: '₹920', status: 'Delivered', tone: 'green' },
          { title: 'Idli Karam + Kandi Podi Combo', meta: 'Suresh Supermarket · 24 Packs', metric: '₹4,800', status: 'Dispatched', tone: 'blue' },
          { title: 'Avisaginja & Nuvvula Podi', meta: 'Anitha Reddy · 4 × 250g', metric: '₹1,040', status: 'Packing', tone: 'purple' },
          { title: 'Guntur Mirchi Podi Bulk', meta: 'Annapurna Mess · 10 kg', metric: '₹3,900', status: 'Payment Due', tone: 'amber' },
        ],
        widgetTitle: 'Top Selling Varieties',
        widgetBars: [
          { label: 'Idli Karam Podi', valueLabel: '420 Packs', percent: 90 },
          { label: 'Karivepaku Podi', valueLabel: '310 Packs', percent: 72 },
          { label: 'Vellulli Karam', valueLabel: '265 Packs', percent: 61 },
        ],
      },
      {
        id: 'batches',
        navLabel: 'Batch & Stock',
        pageTitle: 'Roasting Batches & Freshness',
        pageSubtitle: 'Track batch codes, roasting dates, and low-stock spice alerts',
        actionLabel: '+ Log New Batch',
        kpis: [
          { label: 'Active Batches', value: '14', delta: 'Fresh < 10 days' },
          { label: 'Ready Stock', value: '342 kg', delta: 'Across 9 podis' },
          { label: 'Low Stock Alerts', value: '2', delta: 'Roast planned' },
        ],
        tableTitle: 'Batch Inventory Status',
        rows: [
          { title: 'Batch #KP-118 · Karivepaku Podi', meta: 'Roasted 2 days ago · Shelf 90d', metric: '48 kg left', status: 'Fresh Stock', tone: 'green' },
          { title: 'Batch #KP-119 · Kandi Podi', meta: 'Roasted Today · Cooling', metric: '65 kg', status: 'Packing Ready', tone: 'blue' },
          { title: 'Batch #KP-112 · Vellulli Karam', meta: 'Roasted 18 days ago', metric: '9 kg left', status: 'Low Stock', tone: 'amber' },
          { title: 'Batch #KP-120 · Nuvvula Podi', meta: 'Raw Sesame Verified', metric: '35 kg', status: 'In Grinding', tone: 'purple' },
        ],
        widgetTitle: 'Inventory Health',
        widgetBars: [
          { label: 'Roasted Podi Stock', valueLabel: '84%', percent: 84 },
          { label: 'Guntur Chilli Raw', valueLabel: '72%', percent: 72 },
          { label: '100g/250g Jars', valueLabel: '91%', percent: 91 },
        ],
      },
      {
        id: 'pricing',
        navLabel: 'Pack Pricing',
        pageTitle: 'Weight & Pack-Size Rate Card',
        pageSubtitle: 'Consistent retail and wholesale pricing for 100g to 1kg packs',
        actionLabel: 'Update Rates',
        kpis: [
          { label: 'Active SKUs', value: '36', delta: '9 podis × 4 sizes' },
          { label: 'Most Popular Pack', value: '250g Jar', delta: '46% of orders' },
          { label: 'Bulk Margin Avg', value: '34%', delta: 'Healthy margin' },
        ],
        tableTitle: 'Pack-Size Pricing Matrix',
        rows: [
          { title: 'Karivepaku Karam Podi', meta: '100g ₹110 · 250g ₹240 · 500g ₹460', metric: '1kg ₹880', status: 'Active', tone: 'green' },
          { title: 'Guntur Idli Karam', meta: '100g ₹100 · 250g ₹220 · 500g ₹420', metric: '1kg ₹800', status: 'Active', tone: 'green' },
          { title: 'Flaxseed (Avisaginja) Podi', meta: '100g ₹120 · 250g ₹260 · 500g ₹490', metric: '1kg ₹940', status: 'Best Seller', tone: 'purple' },
          { title: 'Wholesale Pouch (1kg)', meta: 'Min. 10 Packs · Kirana Rate', metric: '₹690/kg', status: 'B2B Tier', tone: 'blue' },
        ],
        widgetTitle: 'Orders by Pack Weight',
        widgetBars: [
          { label: '250g Family Jar', valueLabel: '46%', percent: 46 },
          { label: '500g Value Pouch', valueLabel: '31%', percent: 31 },
          { label: '1kg Bulk Pack', valueLabel: '23%', percent: 23 },
        ],
      },
      {
        id: 'reorders',
        navLabel: 'Repeat Orders',
        pageTitle: 'Consumption Cycle & Reorders',
        pageSubtitle: 'Automated 30-day reminders when families run low on podi jars',
        actionLabel: 'Trigger Reminders',
        kpis: [
          { label: 'Due for Reorder', value: '38', delta: 'Bought 30d ago' },
          { label: 'Auto-Converted', value: '24', delta: '63% reply rate' },
          { label: 'Courier Dispatched', value: '19', delta: 'AWB shared' },
        ],
        tableTitle: 'Repeat Order Queue',
        rows: [
          { title: 'Lakshmi Narasimhan · Vijayawada', meta: 'Last bought 32d ago · 500g × 2', metric: '₹920 est.', status: 'Reordered', tone: 'green' },
          { title: 'Swathi Krishna · Hyderabad', meta: 'WhatsApp Combo Offer Sent', metric: '₹680 est.', status: 'Reminder Sent', tone: 'blue' },
          { title: 'GreenMart Kirana · Guntur', meta: 'Monthly Shelf Replenishment', metric: '₹6,400', status: 'Confirmed', tone: 'purple' },
          { title: 'Ramesh Babu · Tirupati', meta: 'Courier AWB #DTDC9941', metric: '₹1,150', status: 'In Transit', tone: 'amber' },
        ],
        widgetTitle: 'Reorder Conversion',
        widgetBars: [
          { label: 'WhatsApp Nudges', valueLabel: '63%', percent: 63 },
          { label: 'Combo Offers', valueLabel: '74%', percent: 74 },
          { label: 'Kirana Subscriptions', valueLabel: '88%', percent: 88 },
        ],
      },
    ],
  },
  {
    id: 'pickles-sales-crm',
    name: 'Pickle Sales CRM',
    shortDesc:
      'Manage pickle varieties, orders, bulk and retail customers, stock, dispatch and follow-ups.',
    fullDesc:
      'Purpose-built for homemade and commercial pickle makers. Separate retail jar orders from bulk distributor pricing, monitor seasonal mango or gongura stock levels, track courier dispatches, and schedule customer follow-ups.',
    tags: ['Orders & dispatch', 'Customer follow-ups', 'Stock tracking'],
    highlights: [
      'Separate retail and wholesale rate cards by variety',
      'Jar stock and seasonal batch inventory monitoring',
      'Packing checklist and courier AWB dispatch updates',
      'Automated festival and seasonal reorder follow-ups',
    ],
    icon: 'jar',
    showcasePages: [
      {
        id: 'overview',
        navLabel: 'Store Overview',
        pageTitle: 'Pickles Orders & Dispatch Hub',
        pageSubtitle: 'Retail jar sales, bulk orders, and courier dispatches at a glance',
        actionLabel: '+ New Pickle Order',
        kpis: [
          { label: 'Monthly Orders', value: '482', delta: '+26%' },
          { label: 'Bulk Distributors', value: '28', delta: '4 new towns' },
          { label: 'Revenue MTD', value: '₹4,12,000', delta: '+19%' },
        ],
        tableTitle: 'Recent Orders',
        rows: [
          { title: 'Avakaya & Gongura Gift Box', meta: 'Deepak Rao · 4 × 500g Glass Jars', metric: '₹1,760', status: 'Dispatched', tone: 'green' },
          { title: 'Boneless Chicken Pickle', meta: 'Srinivas Store · 30 × 250g', metric: '₹8,400', status: 'Paid', tone: 'blue' },
          { title: 'Magaya & Tomato Pachadi', meta: 'Kavya Nair · NRI Travel Pack', metric: '₹3,200', status: 'Vacuum Sealed', tone: 'purple' },
          { title: 'Prawns Pickle Special', meta: 'Harish V. · COD Local Rider', metric: '₹1,150', status: 'Out Today', tone: 'amber' },
        ],
        widgetTitle: 'Top Performing Varieties',
        widgetBars: [
          { label: 'Andhra Avakaya', valueLabel: '38%', percent: 88 },
          { label: 'Gongura Pandu Mirchi', valueLabel: '24%', percent: 64 },
          { label: 'Non-Veg Pickles', valueLabel: '38%', percent: 84 },
        ],
      },
      {
        id: 'varieties',
        navLabel: 'Pickle Varieties',
        pageTitle: 'Veg & Non-Veg Pickle Catalog',
        pageSubtitle: 'Manage seasonal availability, spice levels, and oil-pack options',
        actionLabel: '+ Add Variety',
        kpis: [
          { label: 'Veg Varieties', value: '14', delta: 'Seasonal & Classic' },
          { label: 'Non-Veg Varieties', value: '7', delta: 'Made to order' },
          { label: 'NRI Vacuum Packs', value: '120', delta: 'Leak-proof sealed' },
        ],
        tableTitle: 'Catalog Performance',
        rows: [
          { title: 'Classic Bellam Avakaya', meta: 'Sesame Oil · 250g / 500g / 1kg', metric: '₹440 / 500g', status: 'In Season', tone: 'green' },
          { title: 'Gongura Chicken Pickle', meta: 'Fresh Batch Every Tuesday', metric: '₹620 / 500g', status: 'High Demand', tone: 'purple' },
          { title: 'Usirikaya (Amla) Pickle', meta: 'Winter Special Batch', metric: '₹390 / 500g', status: 'Fresh Stock', tone: 'blue' },
          { title: 'Nimmakaya (Lemon) Aged', meta: 'Zero Oil Variant Available', metric: '₹360 / 500g', status: 'Low Jars', tone: 'amber' },
        ],
        widgetTitle: 'Catalog Demand Share',
        widgetBars: [
          { label: 'Mango & Gongura', valueLabel: '54%', percent: 54 },
          { label: 'Chicken & Prawns', valueLabel: '31%', percent: 31 },
          { label: 'Tomato & Lemon', valueLabel: '15%', percent: 22 },
        ],
      },
      {
        id: 'stock',
        navLabel: 'Stock & Jars',
        pageTitle: 'Jar Stock & Dispatch Queue',
        pageSubtitle: 'Monitor glass/PET jar counts, seal labels, and courier pickups',
        actionLabel: 'Print Packing Slips',
        kpis: [
          { label: 'Ready Jars', value: '910', delta: 'Packed & labeled' },
          { label: 'Courier Pickups', value: '34', delta: 'Today 5:00 PM' },
          { label: 'Pending Seals', value: '12', delta: 'NRI export pack' },
        ],
        tableTitle: 'Dispatch Checklist',
        rows: [
          { title: 'Order #PK-781 · Bangalore', meta: 'BlueDart Air · Bubble Wrapped', metric: '2.5 kg', status: 'AWB Ready', tone: 'green' },
          { title: 'Order #PK-782 · Chennai', meta: 'DTDC Surface · 6 Jars', metric: '4.0 kg', status: 'Picked Up', tone: 'blue' },
          { title: 'Order #PK-783 · USA Travel Pack', meta: 'Double Vacuum + Leak Seal', metric: '6.0 kg', status: 'Sealing', tone: 'purple' },
          { title: '500g Glass Jars (Empty)', meta: 'Packaging Store Inventory', metric: '45 left', status: 'Reorder Soon', tone: 'amber' },
        ],
        widgetTitle: 'Fulfillment Pipeline',
        widgetBars: [
          { label: 'Orders Packed', valueLabel: '92%', percent: 92 },
          { label: 'On-Time Dispatch', valueLabel: '97%', percent: 97 },
          { label: 'Jar Stock Buffer', valueLabel: '64%', percent: 64 },
        ],
      },
      {
        id: 'followups',
        navLabel: 'Follow-ups',
        pageTitle: 'Bulk Buyers & Festival Follow-ups',
        pageSubtitle: 'Follow up with wholesale grocers and festival gift buyers',
        actionLabel: 'Schedule Calls',
        kpis: [
          { label: 'Wholesale Accounts', value: '28', delta: '₹1.9L/mo avg' },
          { label: 'Follow-ups Today', value: '14', delta: '9 completed' },
          { label: 'Festival Pre-Orders', value: '46', delta: 'Sankranti packs' },
        ],
        tableTitle: 'Customer Follow-up List',
        rows: [
          { title: 'Annapurna Grocers · Secunderabad', meta: 'Monthly Wholesale Restock', metric: '₹18,500', status: 'Confirmed', tone: 'green' },
          { title: 'Madhavi Reddy · Corporate Gifting', meta: '50 Combo Boxes Quote Sent', metric: '₹42,000', status: 'Call at 4 PM', tone: 'amber' },
          { title: 'Coastal Mart · Vizag', meta: 'Requested Non-Veg Sample', metric: '₹12,000', status: 'Sample Sent', tone: 'blue' },
          { title: 'Prasad Family · Repeat Buyer', meta: 'Buys every 45 days', metric: '₹2,400', status: 'WhatsApp Sent', tone: 'purple' },
        ],
        widgetTitle: 'Channel Split',
        widgetBars: [
          { label: 'Direct Home Buyers', valueLabel: '58%', percent: 58 },
          { label: 'Retail & Kirana', valueLabel: '29%', percent: 29 },
          { label: 'Corporate & NRI Packs', valueLabel: '13%', percent: 26 },
        ],
      },
    ],
  },
  {
    id: 'lunch-box-crm',
    name: 'Lunch Boxes CRM',
    shortDesc:
      'Manage daily and monthly lunch subscribers, menus, delivery routes, pauses and payments.',
    fullDesc:
      'Made for tiffin services, home kitchens, and corporate lunch box subscriptions. Handle daily meal pauses without billing errors, publish rotating weekly menus, optimize rider delivery routes, and track monthly renewals.',
    tags: ['Subscriber plans', 'Delivery routes', 'Daily menu'],
    highlights: [
      'Active, paused, and expiring subscription status board',
      'Daily kitchen headcount sheet split by veg/non-veg',
      'Area-wise rider route sheets and box count summaries',
      'Automatic validity extension for skipped meal days',
    ],
    icon: 'packageCheck',
    showcasePages: [
      {
        id: 'kitchen',
        navLabel: 'Kitchen Board',
        pageTitle: 'Today’s Lunch Box Production',
        pageSubtitle: 'Exact box count excluding paused subscribers for today’s lunch',
        actionLabel: 'Print Kitchen Sheet',
        kpis: [
          { label: 'Boxes to Cook Today', value: '312', delta: '18 paused today' },
          { label: 'Veg / Non-Veg Split', value: '218 / 94', delta: 'Synced at 9 AM' },
          { label: 'Active Subscribers', value: '330', delta: '+24 this month' },
        ],
        tableTitle: 'Meal Variant Breakdown',
        rows: [
          { title: 'Executive Veg Thali', meta: '2 Curries, Dal, Rice, 3 Rotis, Curd', metric: '164 Boxes', status: 'Packing Now', tone: 'green' },
          { title: 'Homestyle Non-Veg Box', meta: 'Chicken Curry + Veg Side + Rice', metric: '94 Boxes', status: 'Cooking', tone: 'blue' },
          { title: 'Millet & Low-Oil Diet Box', meta: 'Jowar Roti + Sprouts Salad', metric: '54 Boxes', status: 'Ready', tone: 'purple' },
          { title: 'Paused Subscriptions Today', meta: 'Auto-extended by +1 day', metric: '18 Boxes', status: 'Skipped', tone: 'amber' },
        ],
        widgetTitle: 'Dispatch Readiness',
        widgetBars: [
          { label: 'Kitchen Prep', valueLabel: '100%', percent: 100 },
          { label: 'Box Packing', valueLabel: '78%', percent: 78 },
          { label: 'Riders Loaded', valueLabel: '55%', percent: 55 },
        ],
      },
      {
        id: 'subscribers',
        navLabel: 'Subscribers',
        pageTitle: 'Monthly & Trial Subscribers',
        pageSubtitle: 'Track active tiffin plans, remaining meals, and renewals',
        actionLabel: '+ New Subscriber',
        kpis: [
          { label: 'Monthly Retention', value: '89%', delta: '+4% vs last mo' },
          { label: 'Expiring in 3 Days', value: '22', delta: 'Auto-reminder on' },
          { label: 'Trial Week Conversions', value: '74%', delta: 'To 26-day plan' },
        ],
        tableTitle: 'Subscriber Directory',
        rows: [
          { title: 'Kiran Mayi · Madhapur', meta: '26-Day Veg Plan · 14 Meals Left', metric: '₹3,600/mo', status: 'Active', tone: 'green' },
          { title: 'Aditya Kulkarni · Gachibowli', meta: '26-Day Non-Veg · 2 Meals Left', metric: '₹4,400/mo', status: 'Renew Soon', tone: 'amber' },
          { title: 'Sonal Jain · Kondapur', meta: 'Millet Diet Plan · Office Drop', metric: '₹4,100/mo', status: 'Active', tone: 'blue' },
          { title: 'Nikhil Rao · Jubilee Hills', meta: 'Paused Thu–Fri (Travel)', metric: '₹3,600/mo', status: 'Paused 2d', tone: 'purple' },
        ],
        widgetTitle: 'Plan Distribution',
        widgetBars: [
          { label: '26-Day Monthly', valueLabel: '68%', percent: 68 },
          { label: '15-Day Flexi', valueLabel: '21%', percent: 34 },
          { label: '5-Day Trial', valueLabel: '11%', percent: 22 },
        ],
      },
      {
        id: 'menu',
        navLabel: 'Daily Menu',
        pageTitle: 'Weekly Rotating Menu Planner',
        pageSubtitle: 'Publish weekly menus to subscribers and sync kitchen prep',
        actionLabel: 'Publish Menu',
        kpis: [
          { label: 'Menu Cycle', value: 'Week 4', delta: 'Zero repeats' },
          { label: 'Subscriber Rating', value: '4.9 / 5', delta: 'Feedback polled' },
          { label: 'Special Sweet Day', value: 'Friday', delta: 'Bobbatlu included' },
        ],
        tableTitle: 'This Week’s Menu Schedule',
        rows: [
          { title: 'Monday · Gutti Vankaya & Pappu', meta: 'Veg + Egg Curry Option', metric: '312 Boxes', status: 'Served', tone: 'green' },
          { title: 'Tuesday · Methi Dal & Bhindi Fry', meta: 'Homestyle Comfort Menu', metric: '318 Boxes', status: 'Today', tone: 'purple' },
          { title: 'Wednesday · Paneer / Chicken Curry', meta: 'Mid-Week Special', metric: '326 Boxes', status: 'Prepping', tone: 'blue' },
          { title: 'Thursday · Sambar & Aloo Fry', meta: 'Light Digestive Menu', metric: '309 Boxes', status: 'Scheduled', tone: 'amber' },
        ],
        widgetTitle: 'Top Rated Dishes',
        widgetBars: [
          { label: 'Gutti Vankaya', valueLabel: '4.9★', percent: 96 },
          { label: 'Andhra Chicken', valueLabel: '4.9★', percent: 95 },
          { label: 'Pesarattu & Dal', valueLabel: '4.8★', percent: 89 },
        ],
      },
      {
        id: 'routes',
        navLabel: 'Delivery Routes',
        pageTitle: 'Area-Wise Rider Route Sheets',
        pageSubtitle: 'Group corporate towers and apartments for 12:30 PM on-time drop',
        actionLabel: 'Dispatch Riders',
        kpis: [
          { label: 'Active Riders', value: '7', delta: 'All GPS checked' },
          { label: 'Avg. Drop Time', value: '12:24 PM', delta: 'Before 1 PM' },
          { label: 'On-Time Rate', value: '98.4%', delta: 'Past 30 days' },
        ],
        tableTitle: 'Live Route Allocation',
        rows: [
          { title: 'Route 1 · HITEC City & Mindspace', meta: 'Rider: Mahesh · 18 Tech Towers', metric: '92 Boxes', status: 'Out for Drop', tone: 'blue' },
          { title: 'Route 2 · Madhapur & Kavuri Hills', meta: 'Rider: Raju · 24 Stops', metric: '68 Boxes', status: 'Delivered', tone: 'green' },
          { title: 'Route 3 · Gachibowli Financial Dist.', meta: 'Rider: Saleem · 15 Stops', metric: '84 Boxes', status: 'Loading', tone: 'purple' },
          { title: 'Route 4 · Kondapur Apartments', meta: 'Rider: Ganesh · 22 Stops', metric: '68 Boxes', status: 'Loading', tone: 'amber' },
        ],
        widgetTitle: 'Route Box Volume',
        widgetBars: [
          { label: 'HITEC City', valueLabel: '92 Boxes', percent: 92 },
          { label: 'Gachibowli', valueLabel: '84 Boxes', percent: 84 },
          { label: 'Madhapur & Kondapur', valueLabel: '136 Boxes', percent: 95 },
        ],
      },
    ],
  },
];

// TODO: connect to API — Manage services copy & benefits from admin panel
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'crm-setup',
    title: 'CRM Setup & Implementation',
    shortDesc:
      'Guided onboarding, workspace configuration, and data import so your team starts smoothly in days.',
    expandedDesc:
      'We configure your industry CRM workspace end-to-end—importing your existing customer spreadsheets, setting up user roles, and aligning every pipeline stage with how your business operates.',
    benefits: [
      'Clean import of existing customer, vendor, and order records',
      'Pre-configured pipelines tailored to your specific business model',
      'Staff role permissions and branch access setup',
      'Go-live readiness check within 48 hours',
    ],
    accent: 'lavender',
    icon: 'settings',
  },
  {
    id: 'process-automation',
    title: 'Process Automation',
    shortDesc:
      'Eliminate manual follow-ups with automated alerts, rent reminders, and repeat-order triggers.',
    expandedDesc:
      'Turn repetitive daily tasks into reliable workflows. From sending event advance reminders to alerting kitchen teams on paused lunch boxes, automation keeps operations consistent.',
    benefits: [
      'Automated WhatsApp and email follow-up schedules',
      'Recurring billing and subscription renewal alerts',
      'Low-stock and batch expiry notifications',
      'Zero missed leads with instant enquiry assignment',
    ],
    accent: 'pink',
    icon: 'workflow',
  },
  {
    id: 'integration-services',
    title: 'Integration Services',
    shortDesc:
      'Connect WhatsApp, email, payment links, and accounting exports into one connected workflow.',
    expandedDesc:
      'Keep your communication and billing tools synchronized with bestCRM so your team never has to copy-paste customer numbers or order totals across apps.',
    benefits: [
      'Official WhatsApp Business notifications & templates',
      'Email inbox sync for quotes and invoices',
      'Payment link status tracking inside customer records',
      'One-click CSV and GST-ready accounting exports',
    ],
    accent: 'blue',
    icon: 'plug',
  },
  {
    id: 'customization-dev',
    title: 'Customization & Development',
    shortDesc:
      'Custom fields, branded invoice templates, and specialized workflow rules built for your team.',
    expandedDesc:
      'Need custom pack sizes, regional language invoice headers, or multi-branch approval steps? Our engineering team tailors bestCRM modules to fit your exact operational needs.',
    benefits: [
      'Custom invoice, quote, and receipt PDF layouts',
      'Tailored form fields and validation rules',
      'Multi-branch reporting rollups for growing brands',
      'Dedicated staging testing before rollout',
    ],
    accent: 'green',
    icon: 'code2',
  },
  {
    id: 'training-support',
    title: 'Training & Support',
    shortDesc:
      'Hands-on staff onboarding sessions and responsive 24/7 support whenever questions arise.',
    expandedDesc:
      'Software only works when your team enjoys using it. We run practical video training sessions for managers and delivery or front-desk staff, backed by round-the-clock assistance.',
    benefits: [
      'Live role-based walkthroughs for owners and operators',
      'Short regional-language quick-start video guides',
      '24/7 ticket, phone, and WhatsApp support desk',
      'Quarterly workflow review to help you scale',
    ],
    accent: 'orange',
    icon: 'lifeBuoy',
  },
];

export const PACKAGES_BANNER = {
  title: 'Explore Our Packages',
  subtitle:
    'Transparent monthly and annual plans designed for growing small businesses—pick a plan, choose your CRM, and get started in minutes.',
  ctaLabel: 'View Packages',
};

export const STATS_ROW: StatItem[] = [
  { value: '10,000+', label: 'Businesses Trust Us' },
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '99.9%', label: 'Uptime & Reliability' },
  { value: '24/7', label: 'Expert Support' },
];

export const CLOSING_CTA = {
  title: 'Take Your Business to the Next Level',
  description:
    'Join thousands of small business owners managing leads, bookings, subscriptions, and repeat sales effortlessly with bestCRM.',
  buttonLabel: 'Get Started Now',
};

// TODO: connect to API — Pricing plans controlled via future admin panel
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 999,
    yearlyMonthlyEquivalent: 799,
    priceLabel: '₹999',
    description: 'Perfect for small teams getting started.',
    features: [
      'Up to 3 users',
      'Lead & Contact Management',
      'Basic Reports',
      'Email Support',
    ],
    ctaLabel: 'Choose Plan',
    ctaType: 'checkout',
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 2499,
    yearlyMonthlyEquivalent: 1999,
    priceLabel: '₹2,499',
    badge: 'Most Popular',
    highlighted: true,
    description: 'Ideal for growing businesses with more automation.',
    features: [
      'Up to 10 users',
      'Sales Automation',
      'Advanced Reports & Analytics',
      'Integrations (Email, WhatsApp, etc.)',
      'Priority Support',
    ],
    ctaLabel: 'Choose Plan',
    ctaType: 'checkout',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null,
    yearlyMonthlyEquivalent: null,
    priceLabel: 'Contact Us',
    description: 'For larger teams with custom requirements.',
    features: [
      'Unlimited users',
      'Custom Workflows',
      'Advanced Integrations',
      'Dedicated Account Manager',
      'SLA-based Support',
    ],
    ctaLabel: 'Talk to Sales',
    ctaType: 'sales',
  },
];

export const COMPARE_PLANS_ROWS: CompareRow[] = [
  {
    feature: 'Team Users Included',
    starter: 'Up to 3',
    professional: 'Up to 10',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Ready-Made Industry CRM Module',
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Lead & Contact Management',
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Mobile App Access (Android & iOS)',
    starter: true,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Sales & Follow-up Automation',
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Email & WhatsApp Integrations',
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Advanced Reports & Analytics',
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    feature: 'Custom Workflows & API Access',
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    feature: 'Dedicated Account Manager & SLA',
    starter: false,
    professional: false,
    enterprise: true,
  },
];

export const PACKAGES_FAQS: FaqItem[] = [
  {
    question: 'How does billing work for Monthly vs Yearly plans?',
    answer:
      'Monthly plans renew every 30 days with no long-term lock-in. Choosing Yearly billing saves 20% on the monthly rate and is billed once annually for uninterrupted service.',
  },
  {
    question: 'Can I upgrade or change my plan later?',
    answer:
      'Yes. You can upgrade from Starter to Professional or move to Enterprise at any time as your team and customer volume grow, without losing any existing records.',
  },
  {
    question: 'Is there a free trial or live demo before I subscribe?',
    answer:
      'You can request a personalized walkthrough using the Request Demo button on any page. Our team will demonstrate your exact industry CRM (Catering, Hostel, Hotel, Karam Podi, Pickles, or Lunch Box) with sample workflows.',
  },
  {
    question: 'How secure is my customer and business data?',
    answer:
      'All customer records, invoices, and operational logs are encrypted in transit and at rest with automated daily backups and role-based access controls.',
  },
  {
    question: 'How does the app download work after subscribing?',
    answer:
      'Right after subscribing, you are guided to the Download Your App screen with direct Google Play and App Store links. Once you sign in with your registered email or phone, your selected industry CRM workspace loads automatically.',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Choose your CRM',
    description:
      'Pick the ready-made CRM tailored to your business—Catering, Hostel, Hotel, Karam Podi, Pickles Sales, or Lunch Box.',
  },
  {
    step: '02',
    title: 'Pick a plan',
    description:
      'Select Starter, Professional, or Enterprise with monthly or discounted yearly billing that matches your team size.',
  },
  {
    step: '03',
    title: 'Subscribe',
    description:
      'Complete a quick onboarding checkout with your business details to provision your dedicated workspace.',
  },
  {
    step: '04',
    title: 'Download the app and start',
    description:
      'Install the bestCRM mobile app from Google Play or the App Store, sign in, and start managing customers right away.',
  },
];

export const ABOUT_CONTENT = {
  eyebrow: 'About bestCRM',
  title: 'Empowering Businesses with Smart CRM Solutions',
  intro:
    'bestCRM is a modern, scalable and easy-to-use CRM platform designed to help businesses manage customers, streamline operations and drive sustainable growth.',
  chips: ['Customer Centric', 'Innovation Driven', 'Reliable & Secure'],
  pillars: [
    {
      title: 'Our Vision',
      description:
        'To be a leading CRM platform that empowers businesses worldwide.',
    },
    {
      title: 'Our Mission',
      description:
        'To deliver simple, powerful and affordable CRM solutions that drive real business growth.',
    },
    {
      title: 'Our Values',
      description:
        'Customer Success, Innovation, Integrity, and Continuous Improvement.',
    },
  ],
  expertise: {
    title: 'Built Around Real Small-Business Workflows',
    subtitle: 'Business expertise and objectives',
    items: [
      {
        title: 'Industry-Focused CRMs',
        description:
          'Instead of forcing small businesses to customize generic enterprise software from scratch, we ship ready-to-use CRMs tailored for catering, hostels, hotels, karam podi, pickles, and daily lunch box kitchens.',
      },
      {
        title: 'Affordable, Predictable Plans',
        description:
          'With clear plans starting at ₹999/month, growing businesses get enterprise-grade lead tracking, automation, and reporting without hidden implementation fees.',
      },
      {
        title: 'Fast Setup with Dedicated Support',
        description:
          'Go from spreadsheet chaos to a live mobile and web CRM in days, backed by practical onboarding sessions and responsive 24/7 support.',
      },
    ],
  },
};

export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'bestCRM — Ready-Made CRMs for Small Businesses',
    description:
      'Manage customers, sales, and daily operations with bestCRM. Ready-made CRMs for catering, hostels, hotels, karam podi, pickles, and lunch box businesses.',
  },
  '/packages': {
    title: 'Explore Packages & Pricing — bestCRM',
    description:
      'Compare Starter, Professional, and Enterprise CRM plans. Save up to 20% with yearly billing on bestCRM.',
  },
  '/services': {
    title: 'CRM Setup, Automation & Support Services — bestCRM',
    description:
      'End-to-end CRM implementation, workflow automation, WhatsApp integrations, custom development, and 24/7 training & support.',
  },
  '/about': {
    title: 'About bestCRM — Smart CRM Solutions for Growing Businesses',
    description:
      'Learn about bestCRM’s vision, mission, values, and industry-focused CRM software built in Hyderabad for small businesses.',
  },
  '/contact': {
    title: 'Contact Us & Download App — bestCRM',
    description:
      'Get in touch with bestCRM via phone, WhatsApp, or email. Request a demo or download our Android and iOS apps.',
  },
  '/checkout': {
    title: 'Complete Your Subscription — bestCRM',
    description:
      'Choose your industry CRM, enter your business details, and complete your simulated bestCRM subscription.',
  },
  '/download': {
    title: 'Download Your App — bestCRM',
    description:
      'Your bestCRM workspace is ready. Download the mobile app on Google Play or the App Store to get started.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — bestCRM',
    description:
      'Read how bestCRM collects, protects, and manages your business and customer information.',
  },
  '/terms': {
    title: 'Terms of Service — bestCRM',
    description:
      'Review the terms and conditions for using bestCRM software and services.',
  },
  // Dedicated CRM Workspaces
  '/catering-crm': {
    title: 'Catering CRM — Functions, Menu & Plate Schedule | bestCRM',
    description:
      'Catering management system for wedding orders, plate counts, muhurtham schedules, menu packages, and client contracts.',
  },
  '/hostel-crm': {
    title: 'Hostel CRM — Rooms, Beds & Resident Operations | bestCRM',
    description:
      'Hostel and PG management workspace for room allocations, bed occupancy, rent collection, and student complaints.',
  },
  '/hotel-crm': {
    title: 'Hotel CRM — Front Desk, Check-In & Guest Folios | bestCRM',
    description:
      'Hotel management software for room inventory, express guest check-ins, tariffs, and restaurant billing.',
  },
  '/karampodi-crm': {
    title: 'Karam Podi CRM — Roasting Batches & Milling Moisture Log | bestCRM',
    description:
      'Artisanal spice and gunpowder podi batch tracking, roasting temperature logs, moisture QA, and distributor orders.',
  },
  '/karam-podi-crm': {
    title: 'Karam Podi CRM — Roasting Batches & Milling Moisture Log | bestCRM',
    description:
      'Artisanal spice and gunpowder podi batch tracking, roasting temperature logs, moisture QA, and distributor orders.',
  },
  '/picklesales-crm': {
    title: 'Pickle Sales CRM — Bharani Jaadi Curing & Fermentation | bestCRM',
    description:
      'Traditional Indian pickle manufacturing CRM for ceramic jaadi aging, oil levels, shelf-life pH monitoring, and retail orders.',
  },
  '/pickle-sales-crm': {
    title: 'Pickle Sales CRM — Bharani Jaadi Curing & Fermentation | bestCRM',
    description:
      'Traditional Indian pickle manufacturing CRM for ceramic jaadi aging, oil levels, shelf-life pH monitoring, and retail orders.',
  },
  '/pickles-sales-crm': {
    title: 'Pickle Sales CRM — Bharani Jaadi Curing & Fermentation | bestCRM',
    description:
      'Traditional Indian pickle manufacturing CRM for ceramic jaadi aging, oil levels, shelf-life pH monitoring, and retail orders.',
  },
  '/lunchboxes-crm': {
    title: 'Lunch Boxes CRM — Kitchen Production Manifest & Routes | bestCRM',
    description:
      'Dabba and corporate lunch subscription CRM for automated meal splits, roti counts, dispatch routes, and kitchen manifests.',
  },
  '/lunch-boxes-crm': {
    title: 'Lunch Boxes CRM — Kitchen Production Manifest & Routes | bestCRM',
    description:
      'Dabba and corporate lunch subscription CRM for automated meal splits, roti counts, dispatch routes, and kitchen manifests.',
  },
  '/lunch-box-crm': {
    title: 'Lunch Boxes CRM — Kitchen Production Manifest & Routes | bestCRM',
    description:
      'Dabba and corporate lunch subscription CRM for automated meal splits, roti counts, dispatch routes, and kitchen manifests.',
  },
  // Admin Panel
  '/admin': {
    title: 'Admin Panel — Business & Platform Control | bestCRM',
    description:
      'Super Admin and Management console for bestCRM accounts, subscriptions, branches, and platform control.',
  },
};
