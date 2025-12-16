import React, { createContext, useState, ReactNode, useEffect } from 'react';
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

// Helper function to load state from localStorage or use default
const getInitialState = <T,>(key: string, fallback: T): T => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallback;
  } catch (error) {
    console.warn(`Error loading ${key} from localStorage`, error);
    return fallback;
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize states with localStorage check
  // Critical Fix: Map over loaded industries to ensure 'pricingTiers' exists (migration for old data)
  const [industries, setIndustries] = useState<Industry[]>(() => {
    const loaded = getInitialState('industries', DEFAULT_INDUSTRIES);
    if (Array.isArray(loaded)) {
      return loaded.map(ind => ({
        ...ind,
        pricingTiers: ind.pricingTiers || [] // Default to empty array if missing
      }));
    }
    return DEFAULT_INDUSTRIES;
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => getInitialState('faqs', DEFAULT_FAQS));
  const [webhookUrl, setWebhookUrl] = useState<string>(() => getInitialState('webhookUrl', DEFAULT_WEBHOOK_URL));
  const [contactPhone, setContactPhone] = useState<string>(() => getInitialState('contactPhone', DEFAULT_CONTACT_PHONE));
  const [contactEmail, setContactEmail] = useState<string>(() => getInitialState('contactEmail', DEFAULT_CONTACT_EMAIL));
  const [heroImage, setHeroImage] = useState<string>(() => getInitialState('heroImage', DEFAULT_HERO_IMAGE));

  // Effects to save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('industries', JSON.stringify(industries));
  }, [industries]);

  useEffect(() => {
    localStorage.setItem('faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('webhookUrl', JSON.stringify(webhookUrl));
  }, [webhookUrl]);

  useEffect(() => {
    localStorage.setItem('contactPhone', JSON.stringify(contactPhone));
  }, [contactPhone]);

  useEffect(() => {
    localStorage.setItem('contactEmail', JSON.stringify(contactEmail));
  }, [contactEmail]);

  useEffect(() => {
    localStorage.setItem('heroImage', JSON.stringify(heroImage));
  }, [heroImage]);

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