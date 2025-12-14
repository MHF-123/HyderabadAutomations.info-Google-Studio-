
export interface PricingTier {
  id: string;
  name: string;
  price: string;
  features: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  heroHeadline: string;
  demoVideoUrl: string;
  painPoints: string[];
  automatedWorkflows: string[];
  image: string;
  pricingTiers: PricingTier[];
}
