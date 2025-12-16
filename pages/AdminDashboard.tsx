import React, { useState, DragEvent } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { useNavigate, Link } from 'react-router-dom';
import { Industry, FAQ, PricingTier } from '../types';
import { Briefcase, HelpCircle, Settings, LogOut, PlusCircle, Trash2, Pencil, Globe, Eye, UploadCloud, ChevronDown } from 'lucide-react';

type AdminSection = 'industries' | 'faqs' | 'settings' | 'general';

const FormFields: React.FC<{ 
    industry: Omit<Industry, 'id'> | Industry, 
    formType: 'new' | 'edit', 
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>, formType: 'new' | 'edit') => void, 
    onArrayInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>, formType: 'new' | 'edit') => void,
    onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>, formType: 'new' | 'edit') => void, 
    onImageUrlChange: (e: React.ChangeEvent<HTMLInputElement>, formType: 'new' | 'edit') => void 
}> = ({ industry, formType, onInputChange, onArrayInputChange, onImageFileChange, onImageUrlChange }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const syntheticEvent = {
                target: { files }
            } as unknown as React.ChangeEvent<HTMLInputElement>;
            onImageFileChange(syntheticEvent, formType);
        }
    };

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
            <label htmlFor={`${formType}Name`} className="block text-sm font-medium">Industry Name</label>
            <input id={`${formType}Name`} name="name" type="text" value={industry.name} onChange={(e) => onInputChange(e, formType)} required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
         <div>
            <label htmlFor={`${formType}Slug`} className="block text-sm font-medium">Slug (URL path)</label>
            <input id={`${formType}Slug`} name="slug" type="text" value={industry.slug} onChange={(e) => onInputChange(e, formType)} required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
         <div>
            <label htmlFor={`${formType}DemoVideoUrl`} className="block text-sm font-medium">Demo Video URL</label>
            <input id={`${formType}DemoVideoUrl`} name="demoVideoUrl" type="url" value={industry.demoVideoUrl} onChange={(e) => onInputChange(e, formType)} required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
        <div className="md:col-span-2">
            <label htmlFor={`${formType}HeroHeadline`} className="block text-sm font-medium">Hero Headline</label>
            <input id={`${formType}HeroHeadline`} name="heroHeadline" type="text" value={industry.heroHeadline} onChange={(e) => onInputChange(e, formType)} required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
        </div>
        <div>
            <label htmlFor={`${formType}PainPoints`} className="block text-sm font-medium">Pain Points (one per line)</label>
            <textarea 
                id={`${formType}PainPoints`} 
                name="painPoints" 
                rows={4} 
                value={industry.painPoints.join('\n')} 
                onChange={(e) => onArrayInputChange(e, formType)} 
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            ></textarea>
        </div>
         <div>
            <label htmlFor={`${formType}AutomatedWorkflows`} className="block text-sm font-medium">Automated Workflows (one per line)</label>
            <textarea 
                id={`${formType}AutomatedWorkflows`} 
                name="automatedWorkflows" 
                rows={4} 
                value={industry.automatedWorkflows.join('\n')} 
                onChange={(e) => onArrayInputChange(e, formType)} 
                className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            ></textarea>
        </div>
        <div className="md:col-span-2 space-y-4 rounded-md border border-slate-200 dark:border-slate-700 p-4">
             <div className="grid grid-cols-1 gap-4">
                <div>
                    <label htmlFor={`${formType}ImageUrl`} className="block text-sm font-medium">Industry Image URL</label>
                    <input id={`${formType}ImageUrl`} name="image" type="url" value={(industry.image && !industry.image.startsWith('data:')) ? industry.image : ''} onChange={(e) => onImageUrlChange(e, formType)} placeholder="https://example.com/image.png" className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                <div className="relative flex items-center">
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                    <span className="flex-shrink mx-4 text-slate-400 text-sm">OR</span>
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Upload Image File</label>
                    <div
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className={`relative flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${
                            isDragging 
                            ? 'border-primary bg-primary/10' 
                            : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                        }`}
                    >
                        <div className="space-y-1 text-center">
                            <UploadCloud className={`mx-auto h-12 w-12 ${isDragging ? 'text-primary' : 'text-slate-400'}`} aria-hidden="true" />
                            <div className="flex text-sm text-slate-600 dark:text-slate-400">
                                <label 
                                    htmlFor={`${formType}ImageUpload`} 
                                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                >
                                    <span>Upload a file</span>
                                    <input 
                                        id={`${formType}ImageUpload`} 
                                        name="imageUpload" 
                                        type="file" 
                                        className="sr-only" 
                                        onChange={(e) => onImageFileChange(e, formType)} 
                                        accept="image/*" 
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, or GIF</p>
                        </div>
                    </div>
                </div>
             </div>
            {industry.image && (
              <div className="mt-2">
                <label className="block text-sm font-medium">Image Preview</label>
                <img src={industry.image} alt="Preview" className="mt-2 w-48 h-32 object-cover rounded-md border p-1 bg-slate-50 dark:bg-slate-700" />
              </div>
            )}
        </div>
    </div>
    )
};

const AdminDashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<AdminSection>('general');
    const { 
        industries, setIndustries, 
        faqs, setFaqs, 
        webhookUrl, setWebhookUrl,
        contactPhone, setContactPhone,
        contactEmail, setContactEmail,
        heroImage, setHeroImage
    } = useData();
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const renderSection = () => {
        switch(activeSection) {
            case 'general':
                return <ManageGeneralSettings 
                            contactPhone={contactPhone} setContactPhone={setContactPhone}
                            contactEmail={contactEmail} setContactEmail={setContactEmail}
                            heroImage={heroImage} setHeroImage={setHeroImage}
                       />;
            case 'industries':
                return <ManageIndustries industries={industries} setIndustries={setIndustries} editingId={editingId} setEditingId={setEditingId} />;
            case 'faqs':
                return <ManageFaqs faqs={faqs} setFaqs={setFaqs} editingId={editingId} setEditingId={setEditingId} />;
            case 'settings':
                return <ManageSettings webhookUrl={webhookUrl} setWebhookUrl={setWebhookUrl} />;
            default:
                return null;
        }
    }

    const navItems = [
        { id: 'general', label: 'General', icon: <Globe size={20} /> },
        { id: 'industries', label: 'Industries', icon: <Briefcase size={20} /> },
        { id: 'faqs', label: 'FAQs', icon: <HelpCircle size={20} /> },
        { id: 'settings', label: 'Webhook', icon: <Settings size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
             <header className="bg-white dark:bg-dark-bg shadow-md sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">Admin Dashboard</h1>
                        <div className="flex items-center space-x-2">
                           <Link to="/" target="_blank" rel="noopener noreferrer" aria-label="View live site" className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors">
                                <Eye size={20} aria-hidden="true" />
                                <span className="font-medium hidden sm:inline">View Site</span>
                           </Link>
                           <button
                                type="button"
                                onClick={handleLogout}
                                aria-label="Logout"
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={20} aria-hidden="true" />
                                <span className="font-medium hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Tab Navigation */}
                <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 lg:px-8 -mb-px overflow-x-auto">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                                setActiveSection(item.id as AdminSection);
                                setEditingId(null);
                            }}
                            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors flex-shrink-0 ${
                                activeSection === item.id 
                                ? 'border-primary text-primary' 
                                : 'border-transparent text-slate-500 hover:border-slate-300 dark:hover:border-slate-600 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
            </header>

            {/* Main Content */}
            <main className="mx-auto p-4 sm:p-6 lg:p-8">
                {renderSection()}
            </main>
        </div>
    );
};


// Sub-components for managing each section

const ManageGeneralSettings: React.FC<{
    contactPhone: string, setContactPhone: Function,
    contactEmail: string, setContactEmail: Function,
    heroImage: string, setHeroImage: Function
}> = ({ contactPhone, setContactPhone, contactEmail, setContactEmail, heroImage, setHeroImage }) => {
    const [phone, setPhone] = useState(contactPhone);
    const [email, setEmail] = useState(contactEmail);
    const [saved, setSaved] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeroImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setContactPhone(phone);
        setContactEmail(email);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
         <div>
            <h2 className="text-3xl font-bold mb-6">General Site Settings</h2>
            <div className="max-w-2xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-slate-200 dark:border-slate-700 space-y-6">
                <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium">Contact Phone Number</label>
                    <input id="contactPhone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium">Contact Email Address</label>
                    <input id="contactEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                 <div>
                    <label htmlFor="heroImage" className="block text-sm font-medium">Homepage Hero Image</label>
                     <div className="mt-1 flex items-center space-x-4">
                        <img src={heroImage} alt="Hero Background Preview" className="w-32 h-20 object-cover rounded-md border p-1 bg-slate-50 dark:bg-slate-700" />
                        <input 
                            id="heroImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-5 flex items-center space-x-4">
                    <button type="button" onClick={handleSave} className="px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">
                        Save General Settings
                    </button>
                    {saved && <span className="text-green-600">Saved!</span>}
                </div>
            </div>
        </div>
    )
}

const ManageIndustries: React.FC<{ industries: Industry[], setIndustries: Function, editingId: string | null, setEditingId: Function }> = ({ industries, setIndustries, editingId, setEditingId }) => {
    const initialNewIndustryState: Omit<Industry, 'id'> = {
        name: '', slug: '', heroHeadline: '', demoVideoUrl: '',
        painPoints: [], automatedWorkflows: [], image: '', pricingTiers: [],
    };
    const [newIndustry, setNewIndustry] = useState(initialNewIndustryState);
    const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, formType: 'new' | 'edit') => {
        const { name, value } = e.target;
        const updater = formType === 'new' ? setNewIndustry : setEditingIndustry;
        updater(prev => ({ ...prev!, [name]: value }));
    };

    const handleArrayInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, formType: 'new' | 'edit') => {
        const { name, value } = e.target;
        const updater = formType === 'new' ? setNewIndustry : setEditingIndustry;
        updater(prev => ({ ...prev!, [name]: value.split('\n') }));
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, formType: 'new' | 'edit') => {
        const file = e.target.files?.[0];
        const updater = formType === 'new' ? setNewIndustry : setEditingIndustry;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                 updater(prev => ({ ...prev!, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };
     const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>, formType: 'new' | 'edit') => {
        const { value } = e.target;
        const updater = formType === 'new' ? setNewIndustry : setEditingIndustry;
        updater(prev => ({ ...prev!, image: value }));
    };

    const handleAddIndustry = (e: React.FormEvent) => {
        e.preventDefault();
        const finalNewIndustry: Industry = {
            id: Date.now().toString(),
            ...newIndustry,
            // Clean up empty lines
            painPoints: newIndustry.painPoints.filter(p => p.trim() !== ''),
            automatedWorkflows: newIndustry.automatedWorkflows.filter(w => w.trim() !== ''),
        };
        setIndustries([...industries, finalNewIndustry]);
        setNewIndustry(initialNewIndustryState);
        setIsAddFormVisible(false);
    };
    
    const handleEditClick = (industry: Industry) => {
        setEditingId(industry.id);
        setEditingIndustry(industry);
    };

    const handleUpdateIndustry = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingIndustry) return;

        const updatedIndustry = {
            ...editingIndustry,
            // Clean up empty lines
            painPoints: editingIndustry.painPoints.filter(p => p.trim() !== ''),
            automatedWorkflows: editingIndustry.automatedWorkflows.filter(w => w.trim() !== ''),
        };

        setIndustries(industries.map(ind => (ind.id === editingIndustry.id ? updatedIndustry : ind)));
        setEditingId(null);
        setEditingIndustry(null);
    };

    const handleDeleteIndustry = (id: string) => {
        if (window.confirm('Are you sure you want to delete this industry?')) {
            setIndustries(industries.filter(ind => ind.id !== id));
        }
    };
    
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage Industries</h2>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700 mb-8 overflow-hidden">
                <button
                    type="button"
                    onClick={() => setIsAddFormVisible(!isAddFormVisible)}
                    className="w-full flex justify-between items-center p-6 text-left"
                    aria-expanded={isAddFormVisible}
                    aria-controls="add-industry-form"
                >
                    <h3 className="text-xl font-semibold flex items-center"><PlusCircle size={22} className="mr-2 text-primary" /> Add New Industry</h3>
                    <ChevronDown size={24} className={`text-slate-500 transition-transform duration-300 ${isAddFormVisible ? 'rotate-180' : ''}`} />
                </button>
                <div
                    id="add-industry-form"
                    className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isAddFormVisible ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                    <div className="overflow-hidden">
                        <div className="border-t border-slate-200 dark:border-slate-700 p-6">
                            <form id="newIndustryForm" onSubmit={handleAddIndustry}>
                                <FormFields 
                                    industry={newIndustry} 
                                    formType="new" 
                                    onInputChange={handleInputChange} 
                                    onArrayInputChange={handleArrayInputChange}
                                    onImageFileChange={handleImageFileChange} 
                                    onImageUrlChange={handleImageUrlChange} 
                                />
                                <div className="text-right mt-6">
                                    <button type="submit" className="px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">Add Industry</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {industries.map(ind => (
                    <div key={ind.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700">
                        {editingId === ind.id && editingIndustry ? (
                            <form onSubmit={handleUpdateIndustry}>
                                <h3 className="text-xl font-semibold mb-4">Editing: {editingIndustry.name}</h3>
                                <FormFields 
                                    industry={editingIndustry} 
                                    formType="edit" 
                                    onInputChange={handleInputChange} 
                                    onArrayInputChange={handleArrayInputChange}
                                    onImageFileChange={handleImageFileChange} 
                                    onImageUrlChange={handleImageUrlChange} 
                                />
                                <div className="border-t border-slate-200 dark:border-slate-700 mt-6 pt-6">
                                    <ManageIndustryPricing 
                                        tiers={editingIndustry.pricingTiers || []}
                                        onTiersChange={(newTiers) => {
                                            setEditingIndustry(prev => ({ ...prev!, pricingTiers: newTiers }));
                                        }}
                                    />
                                </div>
                                <div className="flex items-center justify-end space-x-2 mt-6">
                                    <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600">Cancel</button>
                                    <button type="submit" className="px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">Save Changes</button>
                                </div>
                            </form>
                        ) : (
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                     <img src={ind.image} alt={ind.name} className="w-24 h-16 object-cover rounded-md" />
                                    <h3 className="text-xl font-semibold">{ind.name}</h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button type="button" onClick={() => handleEditClick(ind)} className="p-2 text-slate-500 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><Pencil size={18} /></button>
                                    <button type="button" onClick={() => handleDeleteIndustry(ind.id)} className="p-2 text-slate-500 hover:text-red-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ManageIndustryPricing: React.FC<{ tiers: PricingTier[], onTiersChange: (tiers: PricingTier[]) => void }> = ({ tiers, onTiersChange }) => {
    const initialNewTierState = { name: '', price: '', features: '' };
    const [newTier, setNewTier] = useState(initialNewTierState);
    const [editingTierId, setEditingTierId] = useState<string | null>(null);
    const [editedTier, setEditedTier] = useState<Omit<PricingTier, 'id'>>({ name: '', price: '', features: [] });

    const handleAddTier = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTier.name.trim() || !newTier.price.trim()) return;
        const finalNewTier: PricingTier = {
            id: Date.now().toString(),
            name: newTier.name,
            price: newTier.price,
            features: newTier.features.split('\n').filter(f => f.trim() !== '')
        };
        onTiersChange([...tiers, finalNewTier]);
        setNewTier(initialNewTierState);
    };

    const handleDeleteTier = (id: string) => {
        onTiersChange(tiers.filter(t => t.id !== id));
    };

    const handleEditClick = (tier: PricingTier) => {
        setEditingTierId(tier.id);
        setEditedTier({ name: tier.name, price: tier.price, features: tier.features });
    };

    const handleUpdateTier = (e: React.FormEvent) => {
        e.preventDefault();
        onTiersChange(tiers.map(t => t.id === editingTierId ? { ...t, ...editedTier } : t));
        setEditingTierId(null);
    };

    return (
        <div>
            <h3 className="text-2xl font-bold mb-6">Manage Pricing Tiers</h3>
            
            {/* Add New Tier Form */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
                <h4 className="text-lg font-semibold mb-4">Add New Tier</h4>
                <form onSubmit={handleAddTier} className="space-y-4">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Tier Name</label>
                            <input type="text" value={newTier.name} onChange={(e) => setNewTier({...newTier, name: e.target.value})} placeholder="e.g., Starter" required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Price</label>
                            <input type="text" value={newTier.price} onChange={(e) => setNewTier({...newTier, price: e.target.value})} placeholder="e.g., ₹25,000" required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Features (one per line)</label>
                        <textarea value={newTier.features} onChange={(e) => setNewTier({...newTier, features: e.target.value})} rows={3} className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">Add Tier</button>
                    </div>
                </form>
            </div>

             {/* Existing Tiers List */}
             <div className="space-y-4">
                {tiers.map(tier => (
                    <div key={tier.id} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                       {editingTierId === tier.id ? (
                           <form onSubmit={handleUpdateTier} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium">Tier Name</label>
                                        <input type="text" value={editedTier.name} onChange={e => setEditedTier({...editedTier, name: e.target.value})} required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Price</label>
                                        <input type="text" value={editedTier.price} onChange={e => setEditedTier({...editedTier, price: e.target.value})} required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Features (one per line)</label>
                                    <textarea value={editedTier.features.join('\n')} onChange={e => setEditedTier({...editedTier, features: e.target.value.split('\n')})} rows={3} className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                                </div>
                                <div className="flex items-center justify-end space-x-2">
                                    <button type="button" onClick={() => setEditingTierId(null)} className="px-3 py-1.5 text-sm bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600">Cancel</button>
                                    <button type="submit" className="px-3 py-1.5 text-sm bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">Save Tier</button>
                                </div>
                           </form>
                       ) : (
                           <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-lg font-medium">{tier.name} - <span className="font-bold">{tier.price}</span></h4>
                                        <ul className="mt-2 text-sm text-slate-600 dark:text-slate-400 list-disc list-inside">
                                            {tier.features.map((f, i) => <li key={i}>{f}</li>)}
                                        </ul>
                                    </div>
                                    <div className="flex items-center space-x-1 flex-shrink-0 ml-4">
                                        <button type="button" onClick={() => handleEditClick(tier)} className="p-2 text-slate-500 hover:text-primary rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"><Pencil size={16} /></button>
                                        <button type="button" onClick={() => handleDeleteTier(tier.id)} className="p-2 text-slate-500 hover:text-red-500 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                           </div>
                       )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const ManageFaqs: React.FC<{ faqs: FAQ[], setFaqs: Function, editingId: string | null, setEditingId: Function }> = ({ faqs, setFaqs, editingId, setEditingId }) => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [editedQuestion, setEditedQuestion] = useState('');
    const [editedAnswer, setEditedAnswer] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestion.trim() || !newAnswer.trim()) return;
        const newFaq: FAQ = { id: Date.now().toString(), question: newQuestion, answer: newAnswer };
        setFaqs([...faqs, newFaq]);
        setNewQuestion('');
        setNewAnswer('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            setFaqs(faqs.filter(faq => faq.id !== id));
        }
    };
    
    const handleEditClick = (faq: FAQ) => {
        setEditingId(faq.id);
        setEditedQuestion(faq.question);
        setEditedAnswer(faq.answer);
    };

    const handleUpdate = (e: React.FormEvent, id: string) => {
        e.preventDefault();
        setFaqs(faqs.map(faq => faq.id === id ? { ...faq, question: editedQuestion, answer: editedAnswer } : faq));
        setEditingId(null);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Manage FAQs</h2>
            
            {/* Add New FAQ Form */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-slate-200 dark:border-slate-700 mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center"><PlusCircle size={22} className="mr-2 text-primary" /> Add a New FAQ</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <div>
                        <label htmlFor="newQuestion" className="block text-sm font-medium">Question</label>
                        <input id="newQuestion" type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Enter the question" required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="newAnswer" className="block text-sm font-medium">Answer</label>
                        <textarea id="newAnswer" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} placeholder="Enter the answer" required rows={3} className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors disabled:bg-slate-400" disabled={!newQuestion || !newAnswer}>Add FAQ</button>
                    </div>
                </form>
            </div>

            {/* Existing FAQs List */}
            <div className="space-y-4">
                {faqs.map(faq => (
                    <div key={faq.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow border border-slate-200 dark:border-slate-700">
                       {editingId === faq.id ? (
                           <form onSubmit={(e) => handleUpdate(e, faq.id)}>
                               <div className="space-y-4">
                                    <div>
                                        <label htmlFor={`editQuestion-${faq.id}`} className="block text-sm font-medium">Question</label>
                                        <input id={`editQuestion-${faq.id}`} type="text" value={editedQuestion} onChange={(e) => setEditedQuestion(e.target.value)} required className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor={`editAnswer-${faq.id}`} className="block text-sm font-medium">Answer</label>
                                        <textarea id={`editAnswer-${faq.id}`} value={editedAnswer} onChange={(e) => setEditedAnswer(e.target.value)} required rows={3} className="mt-1 w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"></textarea>
                                    </div>
                                    <div className="flex items-center justify-end space-x-2">
                                        <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600">Cancel</button>
                                        <button type="submit" className="px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">Save</button>
                                    </div>
                               </div>
                           </form>
                       ) : (
                           <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-medium">{faq.question}</h3>
                                        <p className="mt-2 text-slate-600 dark:text-slate-400">{faq.answer}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                                        <button type="button" onClick={() => handleEditClick(faq)} className="p-2 text-slate-500 hover:text-primary rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><Pencil size={18} /></button>
                                        <button type="button" onClick={() => handleDelete(faq.id)} className="p-2 text-slate-500 hover:text-red-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"><Trash2 size={18} /></button>
                                    </div>
                                </div>
                           </div>
                       )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ManageSettings: React.FC<{webhookUrl: string, setWebhookUrl: Function}> = ({webhookUrl, setWebhookUrl}) => {
    const [url, setUrl] = useState(webhookUrl);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setWebhookUrl(url);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Webhook Settings</h2>
            <div className="max-w-xl bg-white dark:bg-slate-800 p-6 rounded-lg shadow border border-slate-200 dark:border-slate-700">
                <div className="space-y-2">
                    <label htmlFor="webhookUrl" className="block text-sm font-medium">Contact Form Webhook URL</label>
                    <input 
                        id="webhookUrl" 
                        type="url" 
                        value={url} 
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <div className="mt-4 flex items-center space-x-4">
                    <button type="button" onClick={handleSave} className="px-5 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors">
                        Save Changes
                    </button>
                    {saved && <span className="text-green-600">Saved!</span>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;