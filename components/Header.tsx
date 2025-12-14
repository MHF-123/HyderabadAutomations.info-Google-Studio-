import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../hooks/useData';
import ThemeToggle from './ThemeToggle';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const { industries } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // State for the admin redirect feature
  const [brandClicks, setBrandClicks] = useState(0);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Effect to reset click count after a delay, making it a "rapid click" feature
  useEffect(() => {
    if (brandClicks > 0) {
      const timer = setTimeout(() => setBrandClicks(0), 2000); // Reset after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [brandClicks]);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const newClickCount = brandClicks + 1;
    setBrandClicks(newClickCount);

    if (newClickCount >= 5) {
      e.preventDefault(); // Prevent the link from navigating to "/"
      setBrandClicks(0);  // Reset the counter
      navigate('/admin'); // Redirect to the admin panel
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            onClick={handleBrandClick}
            className="text-2xl font-bold text-light-text dark:text-dark-text"
          >
            TaskFuse
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <span>Industries</span>
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                  {industries.map(industry => (
                    <Link
                      key={industry.id}
                      to={`/industries/${industry.slug}`}
                      className="block px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {industry.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <NavLink to="/our-story" className={({isActive}) => isActive ? 'text-primary' : 'hover:text-primary'}>Our Story</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'text-primary' : 'hover:text-primary'}>Contact</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/contact" className="px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">
              Book a Free Demo
            </Link>
          </div>

          <div className="md:hidden flex items-center">
             <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-4">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-light-bg dark:bg-dark-bg border-t border-slate-200 dark:border-slate-800 shadow-lg">
          <nav className="flex flex-col p-4 space-y-4">
             <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center justify-between w-full py-2"
                >
                    <span>Industries</span>
                    <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDropdownOpen && (
                    <div className="pl-4 mt-2 space-y-2">
                    {industries.map(industry => (
                        <Link
                        key={industry.id}
                        to={`/industries/${industry.slug}`}
                        className="block py-1 text-light-text dark:text-dark-text"
                        >
                        {industry.name}
                        </Link>
                    ))}
                    </div>
                )}
            </div>
            <NavLink to="/our-story" className="py-2">Our Story</NavLink>
            <NavLink to="/contact" className="py-2">Contact</NavLink>
            <Link to="/contact" className="mt-4 text-center w-full px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">
              Book a Free Demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;