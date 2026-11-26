import React, { createContext, useContext, useEffect, useState } from 'react';
import { CRM_PRODUCTS, CrmProduct, PRICING_PLANS, PricingPlan } from '../data/content';

export type BillingCycle = 'monthly' | 'yearly';

export interface CheckoutState {
  planId: 'starter' | 'professional';
  billingCycle: BillingCycle;
  crmId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName: string;
  subscribedAt?: string;
}

const STORAGE_KEY = 'bestcrm_checkout_state_v1';

const DEFAULT_CHECKOUT: CheckoutState = {
  planId: 'professional',
  billingCycle: 'monthly',
  crmId: CRM_PRODUCTS[0].id,
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  businessName: '',
};

interface AppContextValue {
  checkout: CheckoutState;
  setCheckout: React.Dispatch<React.SetStateAction<CheckoutState>>;
  selectPlanForCheckout: (planId: 'starter' | 'professional', billingCycle: BillingCycle) => void;
  selectedPlan: PricingPlan;
  selectedCrm: CrmProduct;
  demoModalOpen: boolean;
  openDemoModal: (preselectedRequirement?: string) => void;
  closeDemoModal: () => void;
  enquiryModalOpen: boolean;
  enquiryContext: string;
  openEnquiryModal: (contextLabel?: string) => void;
  closeEnquiryModal: () => void;
  activeCrmModal: CrmProduct | null;
  openCrmModal: (crm: CrmProduct) => void;
  closeCrmModal: () => void;
  modalPreselectedReq: string;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function loadStoredCheckout(): CheckoutState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CHECKOUT;
    const parsed = JSON.parse(raw) as Partial<CheckoutState>;
    return {
      ...DEFAULT_CHECKOUT,
      ...parsed,
    };
  } catch {
    return DEFAULT_CHECKOUT;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [checkout, setCheckout] = useState<CheckoutState>(loadStoredCheckout);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryContext, setEnquiryContext] = useState('General Enquiry');
  const [modalPreselectedReq, setModalPreselectedReq] = useState('Demo Request');
  const [activeCrmModal, setActiveCrmModal] = useState<CrmProduct | null>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(checkout));
    } catch {
      // Ignore storage failures in restricted contexts
    }
  }, [checkout]);

  const selectPlanForCheckout = (
    planId: 'starter' | 'professional',
    billingCycle: BillingCycle
  ) => {
    setCheckout((prev) => ({
      ...prev,
      planId,
      billingCycle,
    }));
  };

  const selectedPlan =
    PRICING_PLANS.find((p) => p.id === checkout.planId) ?? PRICING_PLANS[1];

  const selectedCrm =
    CRM_PRODUCTS.find((c) => c.id === checkout.crmId) ?? CRM_PRODUCTS[0];

  const openDemoModal = (preselectedRequirement = 'Demo Request') => {
    setModalPreselectedReq(preselectedRequirement);
    setDemoModalOpen(true);
  };

  const closeDemoModal = () => setDemoModalOpen(false);

  const openEnquiryModal = (contextLabel = 'General Enquiry') => {
    setEnquiryContext(contextLabel);
    setEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => setEnquiryModalOpen(false);

  const openCrmModal = (crm: CrmProduct) => setActiveCrmModal(crm);
  const closeCrmModal = () => setActiveCrmModal(null);

  return (
    <AppContext.Provider
      value={{
        checkout,
        setCheckout,
        selectPlanForCheckout,
        selectedPlan,
        selectedCrm,
        demoModalOpen,
        openDemoModal,
        closeDemoModal,
        enquiryModalOpen,
        enquiryContext,
        openEnquiryModal,
        closeEnquiryModal,
        activeCrmModal,
        openCrmModal,
        closeCrmModal,
        modalPreselectedReq,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within AppProvider');
  }
  return ctx;
}
