import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';
import Accordion from '../components/Accordion';
import { MessageCircle, Zap, TrendingUp, Search, Bot, Rocket } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

const Home: React.FC = () => {
  const { industries, faqs, heroImage } = useData();
  usePageTitle('Home');
  
  const painPoints = [
    { title: "Communication Overload", description: "Juggling WhatsApp, SMS, and emails from hundreds of customers daily is exhausting and error-prone.", icon: <MessageCircle className="w-10 h-10 text-primary" /> },
    { title: "Repetitive Data Entry", description: "Manually copying order details, customer info, and payment statuses wastes valuable hours.", icon: <Zap className="w-10 h-10 text-primary" /> },
    { title: "Chasing Payments", description: "Manually sending payment reminders is time-consuming and often feels awkward.", icon: <TrendingUp className="w-10 h-10 text-primary" /> }
  ];

  const howItWorksSteps = [
    { title: "1. Discovery Call", description: "We dive deep into your current processes to identify the biggest automation opportunities.", icon: <Search className="w-12 h-12 text-primary" /> },
    { title: "2. We Build & Test", description: "Our team builds your custom automation system, rigorously testing it to ensure it's bug-free.", icon: <Bot className="w-12 h-12 text-primary" /> },
    { title: "3. Deploy & Support", description: "We deploy the solution into your business and provide ongoing support to ensure it runs smoothly.", icon: <Rocket className="w-12 h-12 text-primary" /> }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative py-20 sm:py-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Automate Your Business.
            <br />
            <span className="text-primary">Save 3+ Hours Daily.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-200">
            We build custom AI-powered automation systems that handle your repetitive tasks across WhatsApp, SMS, and Email, so you can focus on growth.
          </p>
          <div className="mt-10">
            <Link to="/contact" className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-teal-500 transition-transform transform hover:scale-105">
              Book a Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Manual Work Trap Section */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Are You Stuck in the Manual Work Trap?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">If these sound familiar, it's time to automate.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {painPoints.map(point => (
              <div key={point.title} className="p-8 bg-white dark:bg-slate-800/50 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
                  {point.icon}
                </div>
                <h3 className="text-xl font-semibold">{point.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Your Path to Effortless Efficiency</h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">Our simple 3-step process ensures a seamless transition to automation.</p>
          </div>
          <div className="relative mt-20">
             <div className="absolute left-1/2 -translate-x-1/2 top-6 h-full w-px bg-slate-300 dark:bg-slate-700 md:block hidden"></div>
             <div className="grid gap-12 md:grid-cols-3">
              {howItWorksSteps.map((step, index) => (
                <div key={step.title} className="text-center flex flex-col items-center">
                   <div className="flex items-center justify-center h-24 w-24 rounded-full bg-white dark:bg-slate-800 border-2 border-primary mb-6 z-10 shadow-lg">
                    {step.icon}
                   </div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Showcase */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Solutions Tailored for Your Industry</h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">We understand the unique challenges faced by modern businesses.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map(industry => (
              <Link key={industry.id} to={`/industries/${industry.slug}`} className="group block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                 <div className="relative">
                    <img src={industry.image} alt={industry.name} className="w-full h-56 object-cover" />
                    <div className="absolute inset-0 bg-black/40"></div>
                 </div>
                <div className="p-6 bg-white dark:bg-slate-800">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{industry.name}</h3>
                  <span className="mt-4 inline-block text-primary font-semibold">Learn More &rarr;</span>
                </div>
              </Link>
            ))}
             <div className="group flex flex-col items-center justify-center text-center p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                <h3 className="text-xl font-bold">Don't See Your Industry?</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-400">We can build custom solutions for any business.</p>
                <Link to="/contact" className="mt-4 text-primary font-semibold hover:underline">
                    Contact Us &rarr;
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h2>
            </div>
            <div className="mt-12">
              {faqs.map(faq => (
                <Accordion key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;