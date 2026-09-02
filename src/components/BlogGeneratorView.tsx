import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  HelpCircle,
  ListOrdered,
  Quote,
  MapPin,
  Table,
  Plus,
  Trash2,
  RefreshCw,
  ChevronRight,
  BookOpen,
  UserCheck
} from 'lucide-react';
import { CampaignSettings } from '../types';
import { useToast } from '../context/ToastContext';


interface BlogGeneratorViewProps {
  settings: CampaignSettings;
}


interface MediaModule {
  id: string;
  type: 'image' | 'video' | 'quote' | 'map' | 'comparison' | 'downloadable';
  title: string;
  details: string;
}


interface ContentSection {
  id: string;
  heading: string;
  body: string;
}


export const BlogGeneratorView: React.FC<BlogGeneratorViewProps> = ({ settings }) => {
  const { showSuccess, showInfo } = useToast();


  // Generator inputs
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState(settings.targetAudience || 'Luxury travelers, families, and executive planners');
  const [authorName, setAuthorName] = useState(settings.brandName || 'Senior Travel Advisor');
  const [authorBio, setAuthorBio] = useState('Senior Luxury Travel Advisor dedicated to bespoke itineraries, VIP accommodations, and high-touch concierge coordination worldwide.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);


  // Structured post state based on standard guide layout
  const [blogTitle, setBlogTitle] = useState('');
  const [bannerImageUrl, setBannerImageUrl] = useState('');
  const [summaryPoints, setSummaryPoints] = useState<string[]>([
    'Curated insider access to top-tier destination experiences.',
    'VIP amenities and private property walkthroughs.',
    'Best travel windows and seasonal weather strategies.',
    'Family-friendly and executive itineraries mapped out.',
    'Seamless end-to-end planning with dedicated advisor support.'
  ]);
  const [sections, setSections] = useState<ContentSection[]>([
    {
      id: 'sec-1',
      heading: 'Premier Accommodations & VIP Experiences',
      body: 'Selecting the right property sets the entire tone for your journey. From private villas to boutique luxury suites, prioritizing dedicated concierge services guarantees an effortless stay tailored to your personal preferences.'
    },
    {
      id: 'sec-2',
      heading: 'Curated Daily Itineraries & Logistics',
      body: 'Maximize your time on the ground with seamless private transfers, skip-the-line admissions, and pre-arranged reservations at sought-after culinary destinations.'
    }
  ]);
  const [modules, setModules] = useState<MediaModule[]>([
    {
      id: 'mod-1',
      type: 'quote',
      title: 'Advisor Insider Tip',
      details: '"Always reserve private transfers at least 30 days in advance during peak season to ensure dedicated luxury fleet availability."'
    },
    {
      id: 'mod-2',
      type: 'comparison',
      title: 'Seasonal Accommodation Comparison',
      details: 'High Season (June–Aug): Full amenities, vibrant energy | Shoulder Season (Sept–Oct): Private atmosphere, optimal weather'
    }
  ]);
  const [conclusion, setConclusion] = useState(
    'Whether you are coordinating an executive retreat or a bespoke family escape, personalized travel architecture turns an ordinary trip into an unforgettable voyage. Connect with our advisory team today to begin designing your custom itinerary.'
  );
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([
    {
      question: 'What is the best time of year to visit?',
      answer: 'Spring and early autumn offer the most favorable weather conditions with fewer crowds at signature locations.'
    },
    {
      question: 'How far in advance should we begin booking?',
      answer: 'We recommend initiating the planning and reservation process 4 to 6 months prior to departure for premier room categories.'
    },
    {
      question: 'Are private customized tours included?',
      answer: 'Yes, every itinerary is individually customized to include vetted private guides, drivers, and VIP access.'
    }
  ]);


  // AI Agent Generator
  const handleGenerateBlog = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);


    try {
      // Formulate calibrated structured article from topic
      setBlogTitle(`The Definitive Guide to ${topic.trim()}: Curated Insights & Itineraries`);
      setBannerImageUrl('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop');
     
      setSummaryPoints([
        `Exclusive insider perspective on maximizing your time in ${topic}.`,
        'Handpicked luxury stays with verified VIP benefits and amenities.',
        'Optimal seasonality, transit tips, and crowd-free scheduling.',
        'Top culinary and cultural experiences reserved in advance.',
        'Complete planning framework supported by certified travel advisors.'
      ]);


      setSections([
        {
          id: 'sec-1',
          heading: `Signature Highlights & Must-Experience Sights in ${topic}`,
          body: `Exploring ${topic} requires a thoughtful balance between iconic landmarks and secluded local gems. By orchestrating your visits with private local guides, you bypass long queues and experience deep cultural context that standard tours miss.`
        },
        {
          id: 'sec-2',
          heading: 'Where to Stay: Handpicked Luxury Properties',
          body: `Accommodations in ${topic} range from historic grand hotels to private boutique retreats. We partner directly with property general managers to guarantee priority room upgrades, daily breakfast credits, and flexible check-in schedules for our clients.`
        },
        {
          id: 'sec-3',
          heading: 'Seamless Transit & On-the-Ground Logistics',
          body: `Navigating local transfers should be effortless. We coordinate dedicated private chauffeurs and helicopter connections where appropriate, ensuring your transitions between destinations are as relaxing as the stays themselves.`
        }
      ]);


      setFaqs([
        {
          question: `What are the entry and seasonal requirements for ${topic}?`,
          answer: `Most travelers find optimal weather and seamless travel windows between May and October. Verify passport validity for at least 6 months beyond travel dates.`
        },
        {
          question: 'Can dietary restrictions and private preferences be accommodated?',
          answer: 'All dining and excursion partners are pre-briefed on specific dietary needs, allergies, and personal preferences prior to arrival.'
        },
        {
          question: 'How do I start planning this journey with an advisor?',
          answer: 'Reach out through our inquiry form to schedule an initial consultation where we outline your bespoke itinerary.'
        }
      ]);


      showSuccess('Blog article generated according to standard publication layout.');
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };


  const handleCopyFullArticle = () => {
    const fullDoc = `# ${blogTitle || 'Blog Post'}\n\n` +
      `**Banner Image (Landscape >= 1600px):** ${bannerImageUrl || 'Insert Image Link'}\n\n` +
      `## Summary\n${summaryPoints.map(p => `- ${p}`).join('\n')}\n\n` +
      `---\n\n` +
      sections.map(s => `## ${s.heading}\n\n${s.body}`).join('\n\n') + '\n\n' +
      `### Media Modules\n${modules.map(m => `**[${m.type.toUpperCase()}] ${m.title}:** ${m.details}`).join('\n')}\n\n` +
      `---\n\n` +
      `## Conclusion\n${conclusion}\n\n` +
      `---\n\n` +
      `## Frequently Asked Questions (FAQ)\n` +
      faqs.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n') + '\n\n' +
      `---\n\n` +
      `## Author Bio\n**${authorName}** — ${authorBio}`;


    navigator.clipboard.writeText(fullDoc);
    setCopied(true);
    showInfo('Full blog post formatted and copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };


  const handleAddSection = () => {
    setSections(prev => [
      ...prev,
      {
        id: `sec-${Date.now()}`,
        heading: 'New Content Section',
        body: 'Provide detailed paragraphs, insider context, and practical travel guidance here.'
      }
    ]);
  };


  const handleAddFaq = () => {
    setFaqs(prev => [
      ...prev,
      {
        question: 'Frequently asked travel question?',
        answer: 'Provide clear, search-friendly guidance answering client queries directly.'
      }
    ]);
  };


  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
              ARTICLE & BLOG GENERATOR
            </span>
            <span className="text-xs text-slate-500 font-medium">Standard Publication Layout</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1"> Blog generator & Content Architect</h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
            Draft long-form, SEO-optimized destination articles with structured summaries, content sections, optional media modules, conclusions, and FAQs.
          </p>
        </div>


        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyFullArticle}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#133966] rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 text-sky-300" />}
            <span>{copied ? 'Copied Full Document' : 'Copy Formatted Blog'}</span>
          </button>
        </div>
      </div>


      {/* Generator Prompt Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <Sparkles className="w-4 h-4 text-[#0284c7]" />
          <span>AI Article Writer & Destination Assistant</span>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Destination / Travel Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Children's Activities in Las Vegas, Mediterranean Yacht Charters, Kyoto Luxury Ryokans..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>


          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Families, Luxury Couples, Corporate Groups"
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>
        </div>


        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={handleGenerateBlog}
            disabled={isGenerating || !topic.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-[#0284c7] hover:bg-sky-600 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Architecting Blog Post...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                <span>Generate Complete Blog Post</span>
              </>
            )}
          </button>
        </div>
      </div>


      {/* Main Blog Document Canvas */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden divide-y divide-slate-200">
       
        {/* 1. Article Title & Banner Image */}
        <div className="p-6 space-y-4 bg-slate-50/50">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Article Headline
            </span>
            <input
              type="text"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              placeholder="e.g. The Definitive Guide to Luxury Travel"
              className="w-full text-lg font-bold text-slate-900 px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Banner Image URL (Landscape $\ge$ 1600px)
              </span>
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={bannerImageUrl}
                  onChange={(e) => setBannerImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or Shutterstock link"
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>
            </div>


            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Author & Attribution
              </span>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Advisor Name"
                  className="w-full text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>
            </div>
          </div>
        </div>


        {/* 2. Summary Section (5-7 bullets) */}
        <div className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-[#0284c7]" />
              <span>Summary (Fast Takeaways)</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">5-7 Takeaway Points</span>
          </div>


          <div className="space-y-2">
            {summaryPoints.map((point, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-50 text-[#0284c7] font-bold text-xs flex items-center justify-center shrink-0 border border-sky-100">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={point}
                  onChange={(e) => {
                    const updated = [...summaryPoints];
                    updated[idx] = e.target.value;
                    setSummaryPoints(updated);
                  }}
                  className="flex-1 text-xs px-3 py-1.5 bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>
            ))}
          </div>
        </div>


        {/* 3. Content Sections */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0284c7]" />
              <span>Content Sections</span>
            </h3>
            <button
              type="button"
              onClick={handleAddSection}
              className="text-xs font-semibold text-[#0284c7] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Section
            </button>
          </div>


          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div key={sec.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={sec.heading}
                    onChange={(e) => {
                      const updated = [...sections];
                      updated[idx].heading = e.target.value;
                      setSections(updated);
                    }}
                    className="flex-1 font-bold text-xs text-slate-900 px-2.5 py-1 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                  <button
                    type="button"
                    onClick={() => setSections(sections.filter(s => s.id !== sec.id))}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>


                <textarea
                  rows={3}
                  value={sec.body}
                  onChange={(e) => {
                    const updated = [...sections];
                    updated[idx].body = e.target.value;
                    setSections(updated);
                  }}
                  className="w-full text-xs text-slate-700 p-2.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>


        {/* 4. Optional Media Modules */}
        <div className="p-6 space-y-3 bg-slate-50/30">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-4 h-4 text-[#0284c7]" />
              <span>Optional Media Modules</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Quotes, Comparisons, Maps, Downloads</span>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modules.map((mod) => (
              <div key={mod.id} className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                    {mod.type}
                  </span>
                  <span className="text-xs font-bold text-slate-800">{mod.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{mod.details}</p>
              </div>
            ))}
          </div>
        </div>


        {/* 5. Conclusion */}
        <div className="p-6 space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Conclusion & Advisor Invitation</h3>
          <textarea
            rows={2}
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            className="w-full text-xs text-slate-700 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
          />
        </div>


        {/* 6. FAQ Section (3-8 Q&As) */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#0284c7]" />
              <span>Frequently Asked Questions (FAQ)</span>
            </h3>
            <button
              type="button"
              onClick={handleAddFaq}
              className="text-xs font-semibold text-[#0284c7] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add FAQ
            </button>
          </div>


          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      setFaqs(updated);
                    }}
                    placeholder="Question..."
                    className="flex-1 font-bold text-xs text-slate-900 px-2.5 py-1 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                  <button
                    type="button"
                    onClick={() => setFaqs(faqs.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...faqs];
                    updated[idx].answer = e.target.value;
                    setFaqs(updated);
                  }}
                  placeholder="Answer..."
                  className="w-full text-xs text-slate-700 p-2.5 bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>
            ))}
          </div>
        </div>


        {/* 7. Author Bio */}
        <div className="p-6 space-y-2 bg-slate-50/50">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Author Bio (3-4 Sentences)
          </span>
          <textarea
            rows={2}
            value={authorBio}
            onChange={(e) => setAuthorBio(e.target.value)}
            className="w-full text-xs text-slate-700 p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
          />
        </div>
      </div>
    </div>
  );
};


export default BlogGeneratorView;



