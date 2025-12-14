
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  question: string;
  answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left py-5"
      >
        <h3 className="text-lg font-medium text-light-text dark:text-dark-text">{question}</h3>
        <ChevronDown
          size={24}
          className={`text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <p className="pb-5 text-slate-600 dark:text-slate-400">
                {answer}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
