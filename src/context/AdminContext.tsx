import React, { createContext, useContext, useEffect, useState } from 'react';
import { CRM_PRODUCTS, PRICING_PLANS } from '../data/content';

// ----------------------------------------------------
// Types matching CODTECH Scope of Work PDF
// ----------------------------------------------------

export type AdminRole = 'super_admin' | 'sales_staff' | 'support_staff';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  crmId: string;
  planId: 'starter' | 'professional' | 'enterprise';
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  status: 'active' | 'blocked' | 'expired';
  joinedDate: string;
  expiresDate: string;
  amountPaid: number;
  region: string;
  activityHistory: { date: string; action: string }[];
}

export interface SaleTransaction {
  id: string;
  invoiceNo: string;
  customerName: string;
  businessName: string;
  crmName: string;
  crmId: string;
  planName: string;
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  amount: number;
  gstAmount: number;
  totalAmount: number;
  date: string;
  status: 'paid' | 'pending' | 'refunded';
  paymentGateway: 'Razorpay' | 'UPI' | 'Card' | 'NetBanking';
  region: string;
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  crmInterest: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  assignedTo: string;
  source: 'Website Demo' | 'Contact Form' | 'WhatsApp' | 'Consultation';
  notes: string[];
  reminderDate?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNo: string;
  userName: string;
  userEmail: string;
  crmName: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: string;
  messages: { sender: 'user' | 'admin'; text: string; time: string }[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Billing' | 'CRM Features' | 'Mobile App';
}

export interface DynamicPricingRule {
  id: string;
  title: string;
  ruleType: 'region' | 'season' | 'volume' | 'offer';
  targetPlan: 'all' | 'starter' | 'professional' | 'enterprise';
  discountPercentage: number;
  region?: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface PriceHistoryLog {
  id: string;
  date: string;
  changedBy: string;
  planName: string;
  oldPrice: number;
  newPrice: number;
  reason: string;
  canRollback: boolean;
}

export interface CouponItem {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrder: number;
  validTill: string;
  usageCount: number;
  active: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  ip: string;
}

export interface WebsiteAnnouncement {
  enabled: boolean;
  message: string;
  badge: string;
  linkText: string;
  linkUrl: string;
  theme: 'purple' | 'green' | 'amber';
}

export interface BranchItem {
  id: string;
  name: string;
  brand: string;
  type: string;
  gstin: string;
  fssaiNumber: string;
  manager: string;
  phone: string;
  address: string;
  capacityPerDay: string;
  status: 'Active' | 'Under Audit';
}

export interface SiteConfig {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  supportPhone: string;
  supportEmail: string;
  supportWhatsApp: string;
}

// ----------------------------------------------------
// Initial Mock Data
// ----------------------------------------------------

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-101',
    name: 'Srinivas Rao',
    email: 'srinivas@suseelacatering.com',
    phone: '+91 98490 12345',
    businessName: 'Suseela Caterings',
    crmId: 'catering-crm',
    planId: 'professional',
    billingCycle: 'yearly',
    status: 'active',
    joinedDate: '2026-01-10',
    expiresDate: '2027-01-10',
    amountPaid: 23988,
    region: 'Hyderabad, Telangana',
    activityHistory: [
      { date: '2026-02-15 11:20 AM', action: 'Created 25 catering menus for Grand Wedding event' },
      { date: '2026-02-20 04:45 PM', action: 'Dispatched automated WhatsApp invoice to client' },
      { date: '2026-02-25 09:15 AM', action: 'Exported monthly guest plate report' },
    ],
  },
  {
    id: 'usr-102',
    name: 'Pooja Reddy',
    email: 'pooja@venkatalakshmihostels.in',
    phone: '+91 98855 67890',
    businessName: 'Venkata Lakshmi Deluxe Women’s PG',
    crmId: 'hostel-crm',
    planId: 'starter',
    billingCycle: 'monthly',
    status: 'active',
    joinedDate: '2026-01-18',
    expiresDate: '2026-03-18',
    amountPaid: 1998,
    region: 'Bengaluru, Karnataka',
    activityHistory: [
      { date: '2026-02-12 10:00 AM', action: 'Recorded 4 new room allocations in Block B' },
      { date: '2026-02-22 02:30 PM', action: 'Issued digital mess fee receipts via SMS' },
    ],
  },
  {
    id: 'usr-103',
    name: 'Ramesh Naidu',
    email: 'ramesh@grandresidencyhotel.com',
    phone: '+91 94401 23456',
    businessName: 'Grand Residency Comfort Stay',
    crmId: 'hotel-crm',
    planId: 'enterprise',
    billingCycle: 'yearly',
    status: 'active',
    joinedDate: '2026-01-05',
    expiresDate: '2027-01-05',
    amountPaid: 47988,
    region: 'Vijayawada, AP',
    activityHistory: [
      { date: '2026-02-18 08:30 AM', action: 'Checked in 14 conference delegation guests' },
      { date: '2026-02-24 07:15 PM', action: 'Generated multi-room GST folios' },
    ],
  },
  {
    id: 'usr-104',
    name: 'Lakshmi Narayana',
    email: 'contact@rayalaseemapodis.com',
    phone: '+91 99887 54321',
    businessName: 'Rayalaseema Karam Podulu & Spices',
    crmId: 'karam-podi-crm',
    planId: 'professional',
    billingCycle: 'monthly',
    status: 'active',
    joinedDate: '2026-02-01',
    expiresDate: '2026-03-01',
    amountPaid: 2499,
    region: 'Kurnool, AP',
    activityHistory: [
      { date: '2026-02-23 03:10 PM', action: 'Added 50kg batch of Garlic Podi into inventory' },
    ],
  },
  {
    id: 'usr-105',
    name: 'Kavitha Devi',
    email: 'kavitha@gunturpickles.in',
    phone: '+91 97000 88991',
    businessName: 'Guntur Avakaya & Pickles Co.',
    crmId: 'pickles-sales-crm',
    planId: 'starter',
    billingCycle: 'monthly',
    status: 'blocked',
    joinedDate: '2025-11-15',
    expiresDate: '2025-12-15',
    amountPaid: 999,
    region: 'Guntur, AP',
    activityHistory: [
      { date: '2025-12-16 12:00 AM', action: 'Account suspended due to unpaid renewal invoice' },
    ],
  },
  {
    id: 'usr-106',
    name: 'Manoj Kumar',
    email: 'manoj@dailyboxtiffin.com',
    phone: '+91 96111 22334',
    businessName: 'Daily Box Tiffin & Meal Subscriptions',
    crmId: 'lunch-box-crm',
    planId: 'professional',
    billingCycle: 'yearly',
    status: 'active',
    joinedDate: '2026-01-20',
    expiresDate: '2027-01-20',
    amountPaid: 23988,
    region: 'Chennai, Tamil Nadu',
    activityHistory: [
      { date: '2026-02-24 06:45 AM', action: 'Generated delivery route manifests for 120 lunch deliveries' },
    ],
  },
];

const INITIAL_TRANSACTIONS: SaleTransaction[] = [
  {
    id: 'txn-901',
    invoiceNo: 'INV-2026-0091',
    customerName: 'Srinivas Rao',
    businessName: 'Suseela Caterings',
    crmName: 'Catering CRM',
    crmId: 'catering-crm',
    planName: 'Professional Plan',
    billingCycle: 'yearly',
    amount: 20328.81,
    gstAmount: 3659.19,
    totalAmount: 23988,
    date: '2026-02-26',
    status: 'paid',
    paymentGateway: 'Razorpay',
    region: 'Telangana',
  },
  {
    id: 'txn-902',
    invoiceNo: 'INV-2026-0092',
    customerName: 'Ramesh Naidu',
    businessName: 'Grand Residency Comfort Stay',
    crmName: 'Hotel CRM',
    crmId: 'hotel-crm',
    planName: 'Enterprise Plan',
    billingCycle: 'yearly',
    amount: 40667.8,
    gstAmount: 7320.2,
    totalAmount: 47988,
    date: '2026-02-25',
    status: 'paid',
    paymentGateway: 'Card',
    region: 'Andhra Pradesh',
  },
  {
    id: 'txn-903',
    invoiceNo: 'INV-2026-0093',
    customerName: 'Pooja Reddy',
    businessName: 'Venkata Lakshmi Deluxe Women’s PG',
    crmName: 'Hostel CRM',
    crmId: 'hostel-crm',
    planName: 'Starter Plan',
    billingCycle: 'monthly',
    amount: 846.61,
    gstAmount: 152.39,
    totalAmount: 999,
    date: '2026-02-25',
    status: 'paid',
    paymentGateway: 'UPI',
    region: 'Karnataka',
  },
  {
    id: 'txn-904',
    invoiceNo: 'INV-2026-0094',
    customerName: 'Lakshmi Narayana',
    businessName: 'Rayalaseema Karam Podulu',
    crmName: 'Karam Podi CRM',
    crmId: 'karam-podi-crm',
    planName: 'Professional Plan',
    billingCycle: 'monthly',
    amount: 2117.8,
    gstAmount: 381.2,
    totalAmount: 2499,
    date: '2026-02-24',
    status: 'paid',
    paymentGateway: 'Razorpay',
    region: 'Andhra Pradesh',
  },
  {
    id: 'txn-905',
    invoiceNo: 'INV-2026-0095',
    customerName: 'Manoj Kumar',
    businessName: 'Daily Box Tiffin',
    crmName: 'Lunch Boxes CRM',
    crmId: 'lunch-box-crm',
    planName: 'Professional Plan',
    billingCycle: 'yearly',
    amount: 20328.81,
    gstAmount: 3659.19,
    totalAmount: 23988,
    date: '2026-02-22',
    status: 'paid',
    paymentGateway: 'UPI',
    region: 'Tamil Nadu',
  },
  {
    id: 'txn-906',
    invoiceNo: 'INV-2026-0096',
    customerName: 'Venkatesh Babu',
    businessName: 'Godavari Pickles',
    crmName: 'Pickle Sales CRM',
    crmId: 'pickles-sales-crm',
    planName: 'Starter Plan',
    billingCycle: 'monthly',
    amount: 846.61,
    gstAmount: 152.39,
    totalAmount: 999,
    date: '2026-02-21',
    status: 'refunded',
    paymentGateway: 'Razorpay',
    region: 'Andhra Pradesh',
  },
];

const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'lead-1',
    name: 'Anil Kumar Varma',
    email: 'anil@varmaevents.com',
    phone: '+91 98888 11223',
    businessType: 'Catering & Event Management',
    crmInterest: 'Catering CRM',
    status: 'new',
    assignedTo: 'Kiran (Sales Lead)',
    source: 'Website Demo',
    notes: ['Enquired about multi-day wedding menu calculators and plate estimation sheets.'],
    reminderDate: '2026-02-27 11:00 AM',
    createdAt: '2026-02-26 09:30 AM',
  },
  {
    id: 'lead-2',
    name: 'Meena Kumari',
    email: 'meena@srihostels.com',
    phone: '+91 97777 44556',
    businessType: 'Student Hostels (3 branches in Madhapur)',
    crmInterest: 'Hostel CRM',
    status: 'contacted',
    assignedTo: 'Priya (Sales Rep)',
    source: 'Contact Form',
    notes: ['Called on Feb 25; requested branch-wise rent consolidation and biometric integration demo.'],
    reminderDate: '2026-02-27 03:00 PM',
    createdAt: '2026-02-25 02:15 PM',
  },
  {
    id: 'lead-3',
    name: 'Bhanu Prakash',
    email: 'bhanu@spicekitchen.in',
    phone: '+91 96666 77889',
    businessType: 'Lunch Box Subscriptions (Corporate tech parks)',
    crmInterest: 'Lunch Boxes CRM',
    status: 'converted',
    assignedTo: 'Kiran (Sales Lead)',
    source: 'WhatsApp',
    notes: ['Converted to Professional Plan on Feb 25! Onboarding scheduled for Saturday.'],
    createdAt: '2026-02-24 10:00 AM',
  },
  {
    id: 'lead-4',
    name: 'Suresh Chandra',
    email: 'suresh@hoteltirupati.com',
    phone: '+91 95555 99001',
    businessType: 'Hotel & Lodge (45 Rooms)',
    crmInterest: 'Hotel CRM',
    status: 'closed',
    assignedTo: 'Unassigned',
    source: 'Consultation',
    notes: ['Postponed CRM upgrade to next quarter due to hotel renovation.'],
    createdAt: '2026-02-20 04:20 PM',
  },
];

const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-1',
    ticketNo: 'TKT-1082',
    userName: 'Srinivas Rao',
    userEmail: 'srinivas@suseelacatering.com',
    crmName: 'Catering CRM',
    subject: 'Need help adding custom sweet items into pre-set festival packages',
    priority: 'medium',
    status: 'open',
    assignedTo: 'Vikram (Tech Support)',
    createdAt: '2026-02-26 08:45 AM',
    messages: [
      { sender: 'user', text: 'Hi team, I am adding a wedding order with 12 items, but need to attach seasonal Ariselu and Bobbatlu as add-ons. How do I configure extra items without changing my base plate rate?', time: '08:45 AM' },
      { sender: 'admin', text: 'Hello Srinivas ji! You can use the "Custom Add-ons" tab inside the Catering order builder. I am preparing a 1-minute screen recording for you.', time: '09:10 AM' }
    ],
  },
  {
    id: 'tkt-2',
    ticketNo: 'TKT-1081',
    userName: 'Pooja Reddy',
    userEmail: 'pooja@venkatalakshmihostels.in',
    crmName: 'Hostel CRM',
    subject: 'Requesting GST invoice with our legal entity name for yearly audit',
    priority: 'low',
    status: 'resolved',
    assignedTo: 'Rohit (Accounts)',
    createdAt: '2026-02-24 11:30 AM',
    messages: [
      { sender: 'user', text: 'Please send our updated GST tax invoice for the hostel CRM renewal with our GSTIN 36AAAAA0000A1Z5.', time: '11:30 AM' },
      { sender: 'admin', text: 'Invoice has been generated and sent to your registered email and WhatsApp. You can also download it from the Invoices tab.', time: '12:00 PM' }
    ],
  },
  {
    id: 'tkt-3',
    ticketNo: 'TKT-1080',
    userName: 'Lakshmi Narayana',
    userEmail: 'contact@rayalaseemapodis.com',
    crmName: 'Karam Podi CRM',
    subject: 'Thermal barcode sticker printing margins on 50mm printer',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Vikram (Tech Support)',
    createdAt: '2026-02-25 04:00 PM',
    messages: [
      { sender: 'user', text: 'Our Bluetooth label printer cuts off the MRP and batch date by 2mm on 100g pack labels.', time: '04:00 PM' },
    ],
  },
];

const INITIAL_DYNAMIC_RULES: DynamicPricingRule[] = [
  {
    id: 'rule-1',
    title: 'Festival Season Discount (Ugadi & Holi Special)',
    ruleType: 'season',
    targetPlan: 'all',
    discountPercentage: 15,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    active: true,
  },
  {
    id: 'rule-2',
    title: 'Tier-2 & Tier-3 Regional Promotion',
    ruleType: 'region',
    targetPlan: 'starter',
    discountPercentage: 20,
    region: 'Andhra Pradesh & Telangana Rural',
    startDate: '2026-02-01',
    endDate: '2026-04-30',
    active: true,
  },
  {
    id: 'rule-3',
    title: 'Multi-Branch Volume Bundle',
    ruleType: 'volume',
    targetPlan: 'enterprise',
    discountPercentage: 25,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    active: false,
  },
];

const INITIAL_PRICE_LOGS: PriceHistoryLog[] = [
  {
    id: 'log-1',
    date: '2026-02-15 10:30 AM',
    changedBy: 'Super Admin (Sohel)',
    planName: 'Starter Plan (Monthly)',
    oldPrice: 1299,
    newPrice: 999,
    reason: 'Reduced base entry barrier for home-based spice and pickle makers',
    canRollback: true,
  },
  {
    id: 'log-2',
    date: '2026-01-01 09:00 AM',
    changedBy: 'Super Admin (Sohel)',
    planName: 'Professional Plan (Yearly)',
    oldPrice: 28999,
    newPrice: 23988,
    reason: 'New Year promotional pricing with 20% annual discount incentive',
    canRollback: false,
  },
];

const INITIAL_COUPONS: CouponItem[] = [
  { code: 'BESTGROWTH20', discountType: 'percentage', discountValue: 20, minOrder: 1500, validTill: '2026-04-30', usageCount: 42, active: true },
  { code: 'FIRSTCRM500', discountType: 'flat', discountValue: 500, minOrder: 999, validTill: '2026-03-31', usageCount: 88, active: true },
  { code: 'BHARATBIZ', discountType: 'percentage', discountValue: 15, minOrder: 2000, validTill: '2026-06-30', usageCount: 19, active: true },
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  { id: 'aud-1', timestamp: '2026-02-26 14:10:05', user: 'sohel (Super Admin)', role: 'super_admin', action: 'Updated Festival Season Dynamic Pricing rule to 15%', ip: '106.51.72.19' },
  { id: 'aud-2', timestamp: '2026-02-26 11:32:40', user: 'kiran (Sales)', role: 'sales_staff', action: 'Converted lead #lead-3 (Bhanu Prakash) to Professional Plan', ip: '183.82.114.88' },
  { id: 'aud-3', timestamp: '2026-02-25 16:45:12', user: 'vikram (Support)', role: 'support_staff', action: 'Replied to Ticket #TKT-1082 (Srinivas Rao)', ip: '49.207.210.15' },
  { id: 'aud-4', timestamp: '2026-02-24 17:00:22', user: 'sohel (Super Admin)', role: 'super_admin', action: 'Unblocked user account for Rayalaseema Karam Podulu', ip: '106.51.72.19' },
];

const INITIAL_ANNOUNCEMENT: WebsiteAnnouncement = {
  enabled: true,
  badge: '🔥 Special Offer',
  message: 'Get 20% OFF on all yearly CRM plans + Free WhatsApp Integration setup!',
  linkText: 'Claim Discount',
  linkUrl: '/packages',
  theme: 'purple',
};

const INITIAL_BRANCHES: BranchItem[] = [
  {
    id: 'BR-01',
    name: 'Madhapur Mega Base Kitchen & Warehousing',
    brand: 'Swastik Grand Catering & BestCRM Labs',
    type: 'Central Base Kitchen',
    gstin: '36AAACB1234F1Z1',
    fssaiNumber: '13624014000321',
    manager: 'Chef K. Venkatesh Rao',
    phone: '+91 98490 22110',
    address: 'Plot 42, Silicon Valley Layout, Madhapur, Hyderabad - 500081',
    capacityPerDay: '3,500 Plates / Shift',
    status: 'Active',
  },
  {
    id: 'BR-02',
    name: 'Financial District Corporate Tiffin Depot',
    brand: 'LunchBox OS Corporate Express',
    type: 'Cloud Kitchen & Depot',
    gstin: '36AAACB1234F1Z1',
    fssaiNumber: '13624014000455',
    manager: 'Syed Imran (Logistics Lead)',
    phone: '+91 99891 44220',
    address: 'Nanakramguda Hub, Opp WaveRock, Gachibowli - 500032',
    capacityPerDay: '800 Tiffins / Day',
    status: 'Active',
  },
  {
    id: 'BR-03',
    name: 'Banjara Hills Wedding Tasting Lounge',
    brand: 'Swastik Royal Events Suite',
    type: 'Retail Tasting Studio',
    gstin: '36AAACB1234F1Z1',
    fssaiNumber: '13624014000108',
    manager: 'Lavanya Reddy (Events Consultant)',
    phone: '+91 97001 88992',
    address: 'Road No 12, Banjara Hills, Hyderabad - 500034',
    capacityPerDay: '8 Tasting Sessions / Day',
    status: 'Active',
  },
  {
    id: 'BR-04',
    name: 'Tenali & Guntur Spice Processing Mill',
    brand: 'Swastik Andhra Karam & Pickles',
    type: 'Regional Processing Center',
    gstin: '37AAACB1234F1Z9',
    fssaiNumber: '10123028000890',
    manager: 'M. Sreeramulu',
    phone: '+91 98852 33441',
    address: 'Mandi Road, Tenali Rural, Andhra Pradesh - 522201',
    capacityPerDay: '1,200 Kg Podi / Day',
    status: 'Active',
  },
];

const INITIAL_SITE_CONFIG: SiteConfig = {
  heroEyebrow: 'All-in-One CRM Software Ecosystem',
  heroTitle: 'Run Your Entire Business On One Platform',
  heroDescription: 'Tailor-made CRM solutions with integrated billing, automated GST invoicing, customer WhatsApp engagement, and real-time operations tracking.',
  supportPhone: '+91 98490 22110',
  supportEmail: 'contact@bestcrm.in',
  supportWhatsApp: '+919849022110',
};

// ----------------------------------------------------
// Admin Context Definition
// ----------------------------------------------------

interface AdminContextType {
  role: AdminRole;
  setRole: (r: AdminRole) => void;
  users: AdminUser[];
  addUser: (u: Omit<AdminUser, 'id' | 'joinedDate' | 'activityHistory'>) => void;
  updateUser: (id: string, updatedFields: Partial<AdminUser>) => void;
  toggleUserStatus: (id: string) => void;
  deleteUser: (id: string) => void;
  transactions: SaleTransaction[];
  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: LeadItem['status']) => void;
  addLeadNote: (id: string, note: string) => void;
  assignLead: (id: string, staff: string) => void;
  tickets: SupportTicket[];
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  assignTicket: (id: string, staff: string) => void;
  addTicketReply: (id: string, text: string) => void;
  rules: DynamicPricingRule[];
  addRule: (r: Omit<DynamicPricingRule, 'id'>) => void;
  toggleRule: (id: string) => void;
  deleteRule: (id: string) => void;
  priceLogs: PriceHistoryLog[];
  rollbackPriceChange: (id: string) => void;
  coupons: CouponItem[];
  addCoupon: (c: CouponItem) => void;
  toggleCoupon: (code: string) => void;
  announcement: WebsiteAnnouncement;
  setAnnouncement: React.Dispatch<React.SetStateAction<WebsiteAnnouncement>>;
  branches: BranchItem[];
  addBranch: (b: Omit<BranchItem, 'id'>) => void;
  updateBranch: (id: string, updatedFields: Partial<BranchItem>) => void;
  deleteBranch: (id: string) => void;
  siteConfig: SiteConfig;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  auditLogs: AuditLogItem[];
  logAuditAction: (action: string) => void;
  // Dynamic Pricing Overrides for public site
  customPlanPrices: Record<string, number>;
  updatePlanPrice: (planId: string, newPrice: number, reason: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<AdminRole>('super_admin');
  
  const [users, setUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [transactions, setTransactions] = useState<SaleTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  const [leads, setLeads] = useState<LeadItem[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_tickets');
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  const [rules, setRules] = useState<DynamicPricingRule[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_rules');
      return saved ? JSON.parse(saved) : INITIAL_DYNAMIC_RULES;
    } catch {
      return INITIAL_DYNAMIC_RULES;
    }
  });

  const [priceLogs, setPriceLogs] = useState<PriceHistoryLog[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_price_logs');
      return saved ? JSON.parse(saved) : INITIAL_PRICE_LOGS;
    } catch {
      return INITIAL_PRICE_LOGS;
    }
  });

  const [coupons, setCoupons] = useState<CouponItem[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_audit');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  const [announcement, setAnnouncement] = useState<WebsiteAnnouncement>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_announcement');
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
    } catch {
      return INITIAL_ANNOUNCEMENT;
    }
  });

  const [customPlanPrices, setCustomPlanPrices] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_custom_prices');
      return saved ? JSON.parse(saved) : { starter: 999, professional: 2499, enterprise: 4999 };
    } catch {
      return { starter: 999, professional: 2499, enterprise: 4999 };
    }
  });

  const [branches, setBranches] = useState<BranchItem[]>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_branches');
      return saved ? JSON.parse(saved) : INITIAL_BRANCHES;
    } catch {
      return INITIAL_BRANCHES;
    }
  });

  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('bestcrm_admin_site_config');
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONFIG;
    } catch {
      return INITIAL_SITE_CONFIG;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bestcrm_admin_users', JSON.stringify(users));
      localStorage.setItem('bestcrm_admin_transactions', JSON.stringify(transactions));
      localStorage.setItem('bestcrm_admin_leads', JSON.stringify(leads));
      localStorage.setItem('bestcrm_admin_tickets', JSON.stringify(tickets));
      localStorage.setItem('bestcrm_admin_rules', JSON.stringify(rules));
      localStorage.setItem('bestcrm_admin_price_logs', JSON.stringify(priceLogs));
      localStorage.setItem('bestcrm_admin_coupons', JSON.stringify(coupons));
      localStorage.setItem('bestcrm_admin_audit', JSON.stringify(auditLogs));
      localStorage.setItem('bestcrm_admin_announcement', JSON.stringify(announcement));
      localStorage.setItem('bestcrm_admin_custom_prices', JSON.stringify(customPlanPrices));
      localStorage.setItem('bestcrm_admin_branches', JSON.stringify(branches));
      localStorage.setItem('bestcrm_admin_site_config', JSON.stringify(siteConfig));
    } catch {
      // ignore
    }
  }, [users, transactions, leads, tickets, rules, priceLogs, coupons, auditLogs, announcement, customPlanPrices, branches, siteConfig]);

  const logAuditAction = (action: string) => {
    const item: AuditLogItem = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user: role === 'super_admin' ? 'sohel (Super Admin)' : role === 'sales_staff' ? 'kiran (Sales)' : 'vikram (Support)',
      role,
      action,
      ip: '106.51.72.19',
    };
    setAuditLogs((prev) => [item, ...prev]);
  };

  const addUser = (u: Omit<AdminUser, 'id' | 'joinedDate' | 'activityHistory'>) => {
    const newUser: AdminUser = {
      ...u,
      id: `usr-${Date.now().toString().slice(-4)}`,
      joinedDate: new Date().toISOString().split('T')[0],
      activityHistory: [{ date: 'Just now', action: 'Account registered and subscribed' }],
    };
    setUsers((prev) => [newUser, ...prev]);
    logAuditAction(`Created new user account for ${u.businessName} (${u.name})`);
  };

  const updateUser = (id: string, updatedFields: Partial<AdminUser>) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const updated = { ...u, ...updatedFields };
          logAuditAction(`Updated user account details for ${updated.name} (${updated.businessName})`);
          return updated;
        }
        return u;
      })
    );
  };

  const addBranch = (b: Omit<BranchItem, 'id'>) => {
    const newBranch: BranchItem = {
      ...b,
      id: `BR-0${branches.length + 1}`,
    };
    setBranches((prev) => [...prev, newBranch]);
    logAuditAction(`Added new branch location: ${b.name} (${b.type})`);
  };

  const updateBranch = (id: string, updatedFields: Partial<BranchItem>) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    );
    logAuditAction(`Updated branch details for #${id}`);
  };

  const deleteBranch = (id: string) => {
    setBranches((prev) => prev.filter((b) => b.id !== id));
    logAuditAction(`Deleted branch #${id}`);
  };

  const updateSiteConfig = (partial: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...partial }));
    logAuditAction('Updated storefront website content & contact settings');
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === 'active' ? 'blocked' : 'active';
          logAuditAction(`${next === 'blocked' ? 'Blocked' : 'Unblocked'} user account ${u.name} (${u.businessName})`);
          return {
            ...u,
            status: next,
            activityHistory: [{ date: 'Just now', action: `Status changed to ${next}` }, ...u.activityHistory],
          };
        }
        return u;
      })
    );
  };

  const deleteUser = (id: string) => {
    const target = users.find((u) => u.id === id);
    if (target) {
      logAuditAction(`Deleted user account ${target.name} (${target.businessName})`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const addLead = (lead: Omit<LeadItem, 'id' | 'createdAt'>) => {
    const newLead: LeadItem = {
      ...lead,
      id: `lead-${Date.now().toString().slice(-4)}`,
      createdAt: 'Just now',
    };
    setLeads((prev) => [newLead, ...prev]);
    logAuditAction(`New lead captured from ${lead.source}: ${lead.name} (${lead.businessType})`);
  };

  const updateLeadStatus = (id: string, status: LeadItem['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    logAuditAction(`Updated lead status for #${id} to ${status}`);
  };

  const addLeadNote = (id: string, note: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, notes: [...l.notes, note] } : l))
    );
    logAuditAction(`Added follow-up note to lead #${id}`);
  };

  const assignLead = (id: string, staff: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, assignedTo: staff } : l))
    );
    logAuditAction(`Assigned lead #${id} to ${staff}`);
  };

  const updateTicketStatus = (id: string, status: SupportTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    logAuditAction(`Changed support ticket #${id} status to ${status}`);
  };

  const assignTicket = (id: string, staff: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, assignedTo: staff } : t))
    );
    logAuditAction(`Assigned ticket #${id} to ${staff}`);
  };

  const addTicketReply = (id: string, text: string) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              messages: [...t.messages, { sender: 'admin', text, time: now }],
              status: 'in_progress',
            }
          : t
      )
    );
    logAuditAction(`Sent reply on ticket #${id}`);
  };

  const addRule = (r: Omit<DynamicPricingRule, 'id'>) => {
    const newRule: DynamicPricingRule = { ...r, id: `rule-${Date.now().toString().slice(-4)}` };
    setRules((prev) => [newRule, ...prev]);
    logAuditAction(`Created dynamic pricing rule: ${r.title} (${r.discountPercentage}%)`);
  };

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const next = !r.active;
          logAuditAction(`${next ? 'Enabled' : 'Disabled'} dynamic pricing rule: ${r.title}`);
          return { ...r, active: next };
        }
        return r;
      })
    );
  };

  const deleteRule = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    logAuditAction(`Deleted dynamic pricing rule #${id}`);
  };

  const rollbackPriceChange = (logId: string) => {
    const item = priceLogs.find((p) => p.id === logId);
    if (!item) return;
    const planKey = item.planName.toLowerCase().includes('starter')
      ? 'starter'
      : item.planName.toLowerCase().includes('professional')
      ? 'professional'
      : 'enterprise';

    setCustomPlanPrices((prev) => ({ ...prev, [planKey]: item.oldPrice }));
    setPriceLogs((prev) =>
      prev.map((p) => (p.id === logId ? { ...p, canRollback: false } : p))
    );
    logAuditAction(`Rolled back ${item.planName} price from ₹${item.newPrice} to ₹${item.oldPrice}`);
  };

  const updatePlanPrice = (planId: string, newPrice: number, reason: string) => {
    const oldPrice = customPlanPrices[planId] || 999;
    setCustomPlanPrices((prev) => ({ ...prev, [planId]: newPrice }));
    const newLog: PriceHistoryLog = {
      id: `log-${Date.now()}`,
      date: 'Just now',
      changedBy: role === 'super_admin' ? 'Super Admin' : 'Staff',
      planName: `${planId.toUpperCase()} Plan`,
      oldPrice,
      newPrice,
      reason,
      canRollback: true,
    };
    setPriceLogs((prev) => [newLog, ...prev]);
    logAuditAction(`Updated ${planId} plan price from ₹${oldPrice} to ₹${newPrice}: ${reason}`);
  };

  const addCoupon = (c: CouponItem) => {
    setCoupons((prev) => [c, ...prev]);
    logAuditAction(`Added coupon code ${c.code} (${c.discountValue}${c.discountType === 'percentage' ? '%' : '₹'})`);
  };

  const toggleCoupon = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
    logAuditAction(`Toggled coupon code ${code}`);
  };

  return (
    <AdminContext.Provider
      value={{
        role,
        setRole,
        users,
        addUser,
        updateUser,
        toggleUserStatus,
        deleteUser,
        transactions,
        leads,
        addLead,
        updateLeadStatus,
        addLeadNote,
        assignLead,
        tickets,
        updateTicketStatus,
        assignTicket,
        addTicketReply,
        rules,
        addRule,
        toggleRule,
        deleteRule,
        priceLogs,
        rollbackPriceChange,
        coupons,
        addCoupon,
        toggleCoupon,
        announcement,
        setAnnouncement,
        branches,
        addBranch,
        updateBranch,
        deleteBranch,
        siteConfig,
        updateSiteConfig,
        auditLogs,
        logAuditAction,
        customPlanPrices,
        updatePlanPrice,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within an AdminProvider');
  return ctx;
}
