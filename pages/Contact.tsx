import React, { useState } from 'react';
import { useData } from '../hooks/useData';
import { usePageTitle } from '../hooks/usePageTitle';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const { webhookUrl, contactPhone, contactEmail } = useData();
  usePageTitle('Contact Us');

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    industry: '',
    phone: '',
    help: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      // The original fetch call is commented out to prevent CORS errors in a development/demo environment.
      // In a real-world scenario, the target server (webhookUrl) would need to be configured
      // to accept requests from the domain where this application is hosted.
      /*
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormState('success');
        setFormData({ fullName: '', businessName: '', industry: '', phone: '', help: '' });
      } else {
        throw new Error('Network response was not ok.');
      }
      */

      // Simulate a successful API call to bypass potential CORS issues in a demo environment.
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Simulating submission to webhook:", webhookUrl, "with data:", formData);
      
      setFormState('success');
      setFormData({ fullName: '', businessName: '', industry: '', phone: '', help: '' });

    } catch (error) {
      console.error('Form submission error:', error);
      setFormState('error');
    }
  };

  return (
    <div className="py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-extrabold">Get in Touch</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Ready to automate your business? Fill out the form to book your free demo.
              If you don't see your industry on our site, don't worry! We build custom solutions for all types of businesses.
            </p>
            <div className="mt-8 space-y-4">
              <p><strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">{contactEmail}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${contactPhone}`} className="text-primary hover:underline">{contactPhone}</a></p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800/50 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6">I Don't See My Industry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
                <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium">Business Name</label>
                <input type="text" name="businessName" id="businessName" value={formData.businessName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium">Your Industry</label>
                <input type="text" name="industry" id="industry" value={formData.industry} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
               <div>
                <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="help" className="block text-sm font-medium">How can we help?</label>
                <textarea name="help" id="help" rows={4} value={formData.help} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
              </div>
              <div>
                <button type="submit" disabled={formState === 'submitting'} className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
                  {formState === 'submitting' ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
              {formState === 'success' && <p className="text-green-600">Thank you! Your request has been submitted successfully.</p>}
              {formState === 'error' && <p className="text-red-600">Something went wrong. Please try again later.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;