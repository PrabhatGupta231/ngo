"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  Upload, 
  Loader2, 
  Image as ImageIcon,
  LayoutTemplate,
  BarChart3,
  ShieldCheck,
  Instagram,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Video,
  BellRing,
  Plus,
  Trash2,
  ExternalLink
} from "lucide-react";
import { parseMediaUrl, Platform } from "@/lib/mediaParser";

const defaultContentFallback = {
  hero: { tagline: "", headline: "", description: "", bannerImage: "" },
  impactStats: { livesImpacted: 0, activeDrives: 0, transparency: 0, fundsDeployed: 0 },
  trustPillars: [],
  instagramPosts: [], // Legacy
  socialMediaFeeds: [],
  announcement: { enabled: false, message: "", link: "", type: "info" }
};

type TabType = "hero" | "impact" | "trust" | "social" | "notification" | "seo";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Content state
  const [content, setContent] = useState<any>(null);
  
  // Uploading state tracking for visual feedback
  const [isUploading, setIsUploading] = useState<string | null>(null);

  // New Media Form state
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaCaption, setNewMediaCaption] = useState("");
  const [newMediaPlatform, setNewMediaPlatform] = useState<Platform>('youtube');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const json = await res.json();
        const mergedData = { ...defaultContentFallback, ...(json.data || json || {}) };
        setContent(mergedData);
      } else {
        setContent(defaultContentFallback);
      }
    } catch (error) {
      console.error("Network error fetching content:", error);
      setContent(defaultContentFallback);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMsg("Saving...");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setStatusMsg("Changes saved successfully!");
        setTimeout(() => setStatusMsg(""), 3000);
      } else {
        const result = await res.json();
        alert(result.error || "Failed to save");
        setStatusMsg("Failed to save changes.");
        setTimeout(() => setStatusMsg(""), 3000);
      }
    } catch (error) {
      console.error(error);
      setStatusMsg("Error saving changes.");
      setTimeout(() => setStatusMsg(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, uploadId: string, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(uploadId);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        callback(data.url);
      } else {
        alert("Upload failed. Make sure Cloudinary is configured.");
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading file.");
    } finally {
      setIsUploading(null);
    }
  };

  const handleAddSocialMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;

    const { platform, embedUrl } = parseMediaUrl(newMediaUrl);
    if (platform === 'unknown' && newMediaPlatform === 'unknown') {
      alert("Could not detect platform. Please select manually or check the URL.");
      return;
    }

    const finalPlatform = platform !== 'unknown' ? platform : newMediaPlatform;

    const newFeed = {
      id: Date.now().toString(),
      platform: finalPlatform,
      url: newMediaUrl,
      caption: newMediaCaption,
      active: true,
    };

    setContent({
      ...content,
      socialMediaFeeds: [newFeed, ...(content.socialMediaFeeds || [])]
    });

    setNewMediaUrl("");
    setNewMediaCaption("");
  };

  if (isLoading && !content) {
    return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin w-10 h-10 text-emerald-600" /></div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-100/70 backdrop-blur-sm">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6 border border-slate-200/80">
          <div className="text-center space-y-2 mb-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Login</h1>
            <p className="text-sm text-slate-500">Secure access to the SewaPrith dashboard.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all outline-none" required />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all outline-none" required />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 text-white py-3.5 rounded-xl hover:bg-emerald-700 transition-colors font-bold shadow-lg shadow-emerald-600/20 disabled:opacity-70 flex justify-center items-center">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  if (!content) return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 text-slate-500">No content available.</div>;

  const tabs = [
    { id: "hero", label: "Hero Section", icon: LayoutTemplate },
    { id: "impact", label: "Impact Counter", icon: BarChart3 },
    { id: "trust", label: "Trust Pillars", icon: ShieldCheck },
    { id: "social", label: "Social Feeds & Video Posts", icon: Video },
    { id: "notification", label: "Live Notification Bar", icon: BellRing },
    { id: "seo", label: "SEO & Settings", icon: Settings },
  ] as const;

  const activeTabName = tabs.find(t => t.id === activeTab)?.label;

  return (
    <div className="fixed inset-0 z-[100] flex bg-slate-100/70 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10 shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 leading-tight">Admin Console</h2>
              <p className="text-xs text-emerald-600 font-semibold">SewaPrith NGO</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5">
          <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Content Modules</p>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-emerald-50 text-emerald-700 font-bold border border-emerald-100 shadow-sm" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-rose-500" />
            Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Sticky Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shrink-0 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-bold">{activeTabName}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {statusMsg && (
              <span className={`text-sm font-bold flex items-center gap-1.5 ${statusMsg.includes('Failed') || statusMsg.includes('Error') ? 'text-rose-600' : 'text-emerald-600'}`}>
                {statusMsg.includes('Failed') || statusMsg.includes('Error') ? null : <CheckCircle2 className="w-4 h-4" />}
                {statusMsg}
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:bg-slate-800 transition-all disabled:opacity-50 hover:-translate-y-0.5"
            >
              {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </header>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto space-y-6">

            {/* TAB: HERO SECTION */}
            {activeTab === "hero" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">Hero Section</h3>
                  <p className="text-sm text-slate-500">Update the main landing area of the homepage.</p>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tagline</label>
                    <input 
                      type="text" 
                      value={content.hero?.tagline || ""} 
                      onChange={(e) => setContent({...content, hero: {...content.hero, tagline: e.target.value}})} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all" 
                      placeholder="e.g., Small Acts, Big Impact."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Headline</label>
                    <input 
                      type="text" 
                      value={content.hero?.headline || ""} 
                      onChange={(e) => setContent({...content, hero: {...content.hero, headline: e.target.value}})} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all font-semibold" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                    <textarea 
                      value={content.hero?.description || ""} 
                      onChange={(e) => setContent({...content, hero: {...content.hero, description: e.target.value}})} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all min-h-[120px]" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Background Banner</label>
                    
                    <div className="mt-2 flex justify-center rounded-2xl border-2 border-dashed border-slate-300 px-6 py-10 hover:bg-slate-50 transition-colors relative group">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-600 focus-within:ring-offset-2 hover:text-emerald-500">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleUpload(e, 'hero-banner', (url) => setContent({...content, hero: {...content.hero, bannerImage: url}}))} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-slate-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                      
                      {isUploading === 'hero-banner' && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                           <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
                           <span className="ml-2 font-bold text-slate-700">Uploading...</span>
                        </div>
                      )}
                    </div>
                    
                    {content.hero?.bannerImage && (
                      <div className="mt-4 relative aspect-[21/9] w-full rounded-xl overflow-hidden border shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={content.hero.bannerImage} alt="Banner Preview" className="w-full h-full object-cover" />
                        <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs px-2 py-1 rounded font-mono truncate max-w-[90%]">
                          {content.hero.bannerImage}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: IMPACT STATS */}
            {activeTab === "impact" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">Impact Statistics</h3>
                  <p className="text-sm text-slate-500">Manage the live counters displayed on the homepage.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lives Impacted</label>
                    <input type="number" value={content.impactStats?.livesImpacted || 0} onChange={(e) => setContent({...content, impactStats: {...content.impactStats, livesImpacted: parseInt(e.target.value)}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-mono text-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Active Drives</label>
                    <input type="number" value={content.impactStats?.activeDrives || 0} onChange={(e) => setContent({...content, impactStats: {...content.impactStats, activeDrives: parseInt(e.target.value)}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-mono text-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transparency (%)</label>
                    <input type="number" value={content.impactStats?.transparency || 0} onChange={(e) => setContent({...content, impactStats: {...content.impactStats, transparency: parseInt(e.target.value)}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-mono text-lg" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Funds Deployed (Lakhs)</label>
                    <input type="number" value={content.impactStats?.fundsDeployed || 0} onChange={(e) => setContent({...content, impactStats: {...content.impactStats, fundsDeployed: parseInt(e.target.value)}})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none font-mono text-lg" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TRUST PILLARS */}
            {activeTab === "trust" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">Trust Pillars</h3>
                  <p className="text-sm text-slate-500">Edit the three core values that highlight SewaPrith&apos;s transparency.</p>
                </div>
                
                <div className="space-y-6">
                  {content.trustPillars?.map((pillar: any, index: number) => (
                    <div key={index} className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">{index + 1}</div>
                        <h4 className="font-bold text-slate-700">Pillar {index + 1}</h4>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                        <input type="text" value={pillar.title} onChange={(e) => {
                          const newPillars = [...content.trustPillars];
                          newPillars[index].title = e.target.value;
                          setContent({...content, trustPillars: newPillars});
                        }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                        <textarea value={pillar.description} onChange={(e) => {
                          const newPillars = [...content.trustPillars];
                          newPillars[index].description = e.target.value;
                          setContent({...content, trustPillars: newPillars});
                        }} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none min-h-[80px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SOCIAL FEEDS */}
            {activeTab === "social" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">Add Social Media Post</h3>
                    <p className="text-sm text-slate-500">Paste a link to embed a YouTube, Instagram, or Facebook post.</p>
                  </div>
                  
                  <form onSubmit={handleAddSocialMedia} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Post URL</label>
                        <input 
                          type="url" 
                          required
                          value={newMediaUrl} 
                          onChange={(e) => setNewMediaUrl(e.target.value)} 
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none" 
                          placeholder="https://..."
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Platform (Manual)</label>
                        <select 
                          value={newMediaPlatform} 
                          onChange={(e) => setNewMediaPlatform(e.target.value as Platform)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none appearance-none"
                        >
                          <option value="youtube">YouTube</option>
                          <option value="instagram">Instagram</option>
                          <option value="facebook">Facebook</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Caption (Optional)</label>
                      <input 
                        type="text" 
                        value={newMediaCaption} 
                        onChange={(e) => setNewMediaCaption(e.target.value)} 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none" 
                      />
                    </div>
                    <button type="submit" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-colors">
                      <Plus className="w-4 h-4" /> Add Post
                    </button>
                  </form>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1">Active Media Feeds</h3>
                    <p className="text-sm text-slate-500">Manage currently visible embedded posts.</p>
                  </div>
                  
                  <div className="space-y-4">
                    {content.socialMediaFeeds?.length === 0 && (
                      <div className="text-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-slate-500 text-sm">
                        No active social media feeds. Add one above.
                      </div>
                    )}
                    {content.socialMediaFeeds?.map((feed: any, index: number) => {
                      const { embedUrl, isShort } = parseMediaUrl(feed.url);
                      return (
                        <div key={feed.id} className={`flex flex-col sm:flex-row gap-5 p-5 rounded-xl border transition-colors ${feed.active ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                          {/* Mini Player Preview */}
                          <div className={`shrink-0 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center ${isShort || feed.platform === 'instagram' ? 'w-24 h-[170px]' : 'w-40 h-[90px]'}`}>
                            {embedUrl ? (
                              <iframe src={embedUrl} className="w-full h-full pointer-events-none opacity-80" />
                            ) : (
                              <span className="text-[10px] text-slate-400 font-bold p-2 text-center">Invalid Link</span>
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">{feed.platform}</span>
                                <a href={feed.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-500 transition-colors">
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                              <p className="text-sm text-slate-700 font-medium mt-1">{feed.caption || "No caption provided."}</p>
                            </div>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <div className="relative">
                                  <input type="checkbox" className="sr-only" checked={feed.active} onChange={(e) => {
                                    const newFeeds = [...content.socialMediaFeeds];
                                    newFeeds[index].active = e.target.checked;
                                    setContent({...content, socialMediaFeeds: newFeeds});
                                  }} />
                                  <div className={`block w-10 h-6 rounded-full transition-colors ${feed.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${feed.active ? 'transform translate-x-4' : ''}`}></div>
                                </div>
                                <span className="text-xs font-bold text-slate-500">{feed.active ? 'Visible' : 'Hidden'}</span>
                              </label>
                              
                              <button onClick={() => {
                                const newFeeds = content.socialMediaFeeds.filter((_: any, i: number) => i !== index);
                                setContent({...content, socialMediaFeeds: newFeeds});
                              }} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: NOTIFICATION */}
            {activeTab === "notification" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">Live Notification Bar</h3>
                  <p className="text-sm text-slate-500">Display a global alert at the top of the website for urgent news or campaigns.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-5 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-800">Enable Notification Banner</h4>
                      <p className="text-xs text-slate-500">Toggle this to instantly show or hide the banner globally.</p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={content.announcement?.enabled || false} onChange={(e) => setContent({...content, announcement: {...content.announcement, enabled: e.target.checked}})} />
                        <div className={`block w-12 h-7 rounded-full transition-colors ${content.announcement?.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${content.announcement?.enabled ? 'transform translate-x-5' : ''}`}></div>
                      </div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Alert Type (Color)</label>
                       <select 
                         value={content.announcement?.type || 'info'} 
                         onChange={(e) => setContent({...content, announcement: {...content.announcement, type: e.target.value}})}
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none appearance-none"
                       >
                         <option value="info">Info (Teal / Blue)</option>
                         <option value="success">Success (Emerald)</option>
                         <option value="urgent">Urgent (Rose)</option>
                       </select>
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CTA Link (Optional)</label>
                       <input 
                         type="text" 
                         value={content.announcement?.link || ""} 
                         onChange={(e) => setContent({...content, announcement: {...content.announcement, link: e.target.value}})} 
                         className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none" 
                         placeholder="/donate or https://..."
                       />
                     </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message Content</label>
                    <textarea 
                      value={content.announcement?.message || ""} 
                      onChange={(e) => setContent({...content, announcement: {...content.announcement, message: e.target.value}})} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none min-h-[100px]" 
                    />
                  </div>

                  {/* Live Preview */}
                  <div className="pt-6 border-t border-slate-100">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Live Preview</label>
                    <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm pointer-events-none">
                      <div className={`w-full py-2.5 px-4 text-center text-sm font-medium ${
                        content.announcement?.type === 'urgent' ? 'bg-rose-500 text-white' : 
                        content.announcement?.type === 'success' ? 'bg-emerald-500 text-white' : 
                        'bg-blue-500 text-white'
                      }`}>
                        {content.announcement?.message || "Your announcement message will appear here."}
                        {content.announcement?.link && <span className="ml-2 underline font-bold">Learn more →</span>}
                      </div>
                      <div className="h-20 bg-slate-100 w-full relative">
                         {/* Mock page content */}
                         <div className="absolute top-4 left-4 w-32 h-4 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB: SEO & SETTINGS */}
            {activeTab === "seo" && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-8 flex flex-col items-center justify-center min-h-[300px] text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <Settings className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-1">SEO & Global Settings</h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">This module is reserved for future global SEO metadata injection and site-wide color theme configurations.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      
    </div>
  );
}
