import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../hooks/useData';

const Footer: React.FC = () => {
  const { contactPhone, contactEmail } = useData();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-light-text dark:text-dark-text">
              TaskFuse
            </Link>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Empowering SMEs with AI & Automation.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Quick Links</h2>
              <ul className="text-slate-500 dark:text-slate-400 font-medium space-y-4">
                <li><Link to="/our-story" className="hover:underline">Our Story</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Contact</h2>
              <ul className="text-slate-500 dark:text-slate-400 font-medium space-y-4">
                <li><a href={`tel:${contactPhone}`} className="hover:underline">{contactPhone}</a></li>
                <li><a href={`mailto:${contactEmail}`} className="hover:underline">{contactEmail}</a></li>
              </ul>
            </div>
             <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-slate-500 dark:text-slate-400 font-medium space-y-4">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-slate-200 sm:mx-auto dark:border-slate-700 lg:my-8" />
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} TaskFuse. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;