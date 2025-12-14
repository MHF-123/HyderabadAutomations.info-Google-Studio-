import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import { PricingTier } from '../types';
import { CheckCircle, XCircle, Rocket } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

const PricingCard: React.FC<{ tier: PricingTier }> = ({ tier }) => {
    const isPro = tier.name === 'Pro';
    return (
        <div className={`relative p-8 rounded-xl border flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${isPro ? 'bg-primary/5 dark:bg-primary/10 border-primary shadow-lg' : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'}`}>
             {isPro && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-bold">{tier.name}</h3>
            <p className="text-4xl font-extrabold my-4">{tier.price}</p>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 flex-grow">
                {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <Link to="/contact" className={`mt-8 text-center w-full px-6 py-3 font-semibold rounded-lg shadow-md transition-colors ${isPro ? 'bg-primary text-white hover:bg-teal-500' : 'bg-slate-200 dark:bg-slate-700 text-light-text dark:text-dark-text hover:bg-slate-300 dark:hover:bg-slate-600'}`}>
                {tier.price === 'Contact Us' ? 'Contact Us' : 'Get Started'}
            </Link>
        </div>
    );
};

const IndustryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { industries } = useData();
  const industry = industries.find(ind => ind.slug === slug);
  
  usePageTitle(industry ? industry.name : 'Industry Not Found');

  if (!industry) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Industry Not Found</h1>
        <p className="mt-4">The industry you are looking for does not exist.</p>
        <Link to="/" className="mt-8 inline-block text-primary hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-24 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 {/* Text Content */}
                <div className="text-center md:text-left">
                    <p className="text-primary font-semibold uppercase tracking-wider">{industry.name}</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-light-text dark:text-dark-text tracking-tight mt-4">
                        {industry.heroHeadline}
                    </h1>
                    <p className="mt-6 max-w-xl mx-auto md:mx-0 text-lg text-slate-600 dark:text-slate-400">
                        Discover how our tailored automation solutions can revolutionize your business, tackling your biggest challenges and unlocking new levels of efficiency.
                    </p>
                    <div className="mt-10">
                        <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-teal-500 transition-transform transform hover:scale-105">
                            Book Your Free Demo <Rocket size={20} />
                        </Link>
                    </div>
                </div>
                {/* Image Content */}
                <div className="relative flex justify-center order-first md:order-last">
                    <div className="animate-float">
                    <img 
                        src={industry.image} 
                        alt={industry.name}
                        className="rounded-xl shadow-2xl w-full max-w-md aspect-[4/3] object-cover relative z-10"
                    />
                    </div>
                    <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/20 rounded-full filter blur-3xl opacity-50 dark:opacity-30"></div>
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-400/20 rounded-full filter blur-3xl opacity-50 dark:opacity-30"></div>
                </div>
            </div>
        </div>
      </section>

      {/* Pain Points & Workflows */}
       <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold">From Manual Chaos to Automated Clarity</h2>
                <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">We turn your operational headaches into streamlined, hands-free workflows.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                {/* Before */}
                <div className="bg-red-500/5 dark:bg-red-500/10 p-8 rounded-xl border border-red-500/20">
                    <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center"><XCircle className="mr-3 flex-shrink-0" />Your Challenges</h3>
                    <ul className="space-y-4">
                        {industry.painPoints.map((point, index) => (
                            <li key={index} className="flex items-start text-lg text-slate-700 dark:text-slate-300">
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* After */}
                <div className="bg-green-500/5 dark:bg-green-500/10 p-8 rounded-xl border border-green-500/20">
                    <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-6 flex items-center"><CheckCircle className="mr-3 flex-shrink-0" />Our Solutions</h3>
                     <ul className="space-y-4">
                        {industry.automatedWorkflows.map((workflow, index) => (
                            <li key={index} className="flex items-start text-lg text-slate-700 dark:text-slate-300">
                                {workflow}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </section>
      
       {/* Demo Video */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">See It In Action</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <iframe
              src={industry.demoVideoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      {industry.pricingTiers && industry.pricingTiers.length > 0 && (
        <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Simple, Transparent Pricing</h2>
              <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">Choose the plan that's right for your business.</p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
              {industry.pricingTiers.map(tier => <PricingCard key={tier.id} tier={tier} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default IndustryDetail;