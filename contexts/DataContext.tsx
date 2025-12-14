import React, { createContext, useState, ReactNode } from 'react';
import { Industry, FAQ, PricingTier } from '../types';
import { 
  DEFAULT_INDUSTRIES, 
  DEFAULT_FAQS, 
  DEFAULT_WEBHOOK_URL,
  DEFAULT_CONTACT_PHONE,
  DEFAULT_CONTACT_EMAIL,
  DEFAULT_HERO_IMAGE
} from '../constants';

interface DataContextType {
  industries: Industry[];
  setIndustries: React.Dispatch<React.SetStateAction<Industry[]>>;
  faqs: FAQ[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQ[]>>;
  webhookUrl: string;
  setWebhookUrl: React.Dispatch<React.SetStateAction<string>>;
  contactPhone: string;
  setContactPhone: React.Dispatch<React.SetStateAction<string>>;
  contactEmail: string;
  setContactEmail: React.Dispatch<React.SetStateAction<string>>;
  heroImage: string;
  setHeroImage: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [industries, setIndustries] = useState<Industry[]>(DEFAULT_INDUSTRIES);
  const [faqs, setFaqs] = useState<FAQ[]>(DEFAULT_FAQS);
  const [webhookUrl, setWebhookUrl] = useState<string>(DEFAULT_WEBHOOK_URL);
  const [contactPhone, setContactPhone] = useState<string>(DEFAULT_CONTACT_PHONE);
  const [contactEmail, setContactEmail] = useState<string>(DEFAULT_CONTACT_EMAIL);
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);

  const value = {
    industries,
    setIndustries,
    faqs,
    setFaqs,
    webhookUrl,
    setWebhookUrl,
    contactPhone,
    setContactPhone,
    contactEmail,
    setContactEmail,
    heroImage,
    setHeroImage,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
