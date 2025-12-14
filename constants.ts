import { Industry, FAQ, PricingTier } from './types';

export const DEFAULT_PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹25,000',
    features: ['1 Core Workflow Automation', 'WhatsApp or Email Integration', 'Basic Setup & Training', 'Monthly Health Check'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹60,000',
    features: ['Up to 3 Workflow Automations', 'WhatsApp, SMS & Email', 'Custom Integration Support', 'Bi-weekly Strategy Calls'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Contact Us',
    features: ['Unlimited Workflows', 'Full System Integration', 'Dedicated Account Manager', '24/7 Priority Support'],
  },
];

export const DEFAULT_INDUSTRIES: Industry[] = [
  {
    id: 'pharma',
    name: 'Pharmaceutical Distributors',
    slug: 'pharma-distributors',
    heroHeadline: "Custom Automation for Pharmaceutical Distributors",
    demoVideoUrl: 'https://www.youtube.com/embed/przg3cE55-E',
    painPoints: ['Manual order taking from 100s of chemists via WhatsApp.', 'Errors in data entry leading to wrong dispatches.', 'Delayed payment reminders and follow-ups.', 'Lack of real-time stock visibility for sales reps.'],
    automatedWorkflows: ['Automated Order Intake via WhatsApp', 'Real-time Inventory Sync', 'Automated Payment Reminders', 'Daily Sales Report Generation'],
    image: 'https://picsum.photos/seed/pharma/600/400',
    pricingTiers: JSON.parse(JSON.stringify(DEFAULT_PRICING_TIERS)),
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    slug: 'manufacturing',
    heroHeadline: "Custom Automation for Manufacturing Units",
    demoVideoUrl: 'https://www.youtube.com/embed/przg3cE55-E',
    painPoints: ['Inefficient lead tracking from multiple sources.', 'Manual follow-up with potential clients.', 'Complex quotation generation process.', 'Difficulty in tracking production stages.'],
    automatedWorkflows: ['Centralized Lead Management System', 'Automated Follow-up Sequences', 'Instant Quotation Generation', 'Production Status Alerts'],
    image: 'https://picsum.photos/seed/factory/600/400',
    pricingTiers: JSON.parse(JSON.stringify(DEFAULT_PRICING_TIERS)),
  },
];

export const DEFAULT_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'What is n8n and why do you use it?',
    answer: 'n8n is a powerful, open-source workflow automation tool. We use it because it allows for incredible flexibility to build custom solutions that perfectly fit your business needs, unlike off-the-shelf software.'
  },
  {
    id: '2',
    question: 'How long does it take to build and deploy an automation?',
    answer: 'A typical project, from our initial discovery call to full deployment, takes between 2 to 4 weeks. This can vary depending on the complexity of the workflows you need.'
  },
  {
    id: '3',
    question: 'Is this a one-time cost or a subscription?',
    answer: 'We offer both. You can opt for a one-time project fee for the initial build or a monthly support and maintenance plan to ensure your automations are always running smoothly and are updated as your business evolves.'
  },
  {
    id: '4',
    question: 'What if I need changes in the future?',
    answer: 'We are your dedicated partners for the long run. We offer support packages for ongoing tweaks, changes, and building new automations as your business grows and your needs change.'
  },
];

export const DEFAULT_WEBHOOK_URL = 'https://pi.n8x.online/webhook/TaskFuse';

export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password120'
};

// General Site Settings
export const DEFAULT_CONTACT_PHONE = '+91 12345 67890';
export const DEFAULT_CONTACT_EMAIL = 'contact@taskfuse.com';
export const DEFAULT_HERO_IMAGE = 'https://picsum.photos/seed/hero/1920/1080';