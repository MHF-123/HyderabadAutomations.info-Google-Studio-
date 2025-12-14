import React from 'react';
import { usePageTitle } from '../hooks/usePageTitle';

const OurStory: React.FC = () => {
  usePageTitle('Our Story');

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-light-text dark:text-dark-text tracking-tight">
              Built for Efficiency, <span className="text-primary">Designed for Growth.</span>
            </h1>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <p>
                With over 18 months of hands-on experience automating my family's business, 
                I saw firsthand how much time and money was wasted on manual, repetitive tasks. 
                Every day was a struggle of juggling WhatsApp messages, updating spreadsheets, and chasing payments.
              </p>
              <p>
                I realized that if my family's business was facing these issues, hundreds of other SMEs
                must be in the same boat.
              </p>
              <p>
                I started TaskFuse to bring the power of efficiency to businesses globally. 
                We're not just service providers; we're dedicated partners committed to understanding and solving your specific problems. 
                Our mission is simple: to give you back your time, so you can focus on what truly matters - growing your business and serving your customers.
              </p>
            </div>
            <div>
                <img 
                    src="https://picsum.photos/seed/founder/800/800" 
                    alt="Founder of TaskFuse" 
                    className="rounded-xl shadow-2xl aspect-square object-cover"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;