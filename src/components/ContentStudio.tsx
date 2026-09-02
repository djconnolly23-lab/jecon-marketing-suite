import React, { useState } from 'react';
import { 
  Plus, 
  Send, 
  Filter, 
  Calendar, 
  Sparkles, 
  Check, 
  Copy, 
  Trash2, 
  Edit3, 
  X, 
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  Share2,
  ThumbsUp,
  MessageCircle,
  Play,
  Music
} from 'lucide-react';
import { PostDraft, Platform, PostStatus, CampaignSettings, MediaType } from '../types';
import { useToast } from '../context/ToastContext';

interface ContentStudioProps {
  posts: PostDraft[];
  settings: CampaignSettings;
  onUpdatePost: (post: PostDraft) => void;
  onAddPost: (post: PostDraft) => void;
  onDeletePost: (id: string) => void;
}

export const ContentStudio: React.FC<ContentStudioProps> = ({
  posts,
  settings,
  onUpdatePost,
  onAddPost,
  onDeletePost,
}) => {
  const { showSuccess, showError, showInfo } = useToast();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostDraft | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // AI Generator Form States
  const [aiTopic, setAiTopic] = useState('');
  const [aiPlatform, setAiPlatform] = useState<Platform>('instagram');
  const [aiMediaType, setAiMediaType] = useState<MediaType>('reel');
  const [aiCtaGoal, setAiCtaGoal] = useState('GROWTH');
  const [aiIsSponsored, setAiIsSponsored] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Manual / Edit Form State
  const [formPost, setFormPost] = useState<Partial<PostDraft>>({
    title: '',
    platform: 'instagram',
    mediaType: 'reel',
    hook: '',
    bodyCopy: '',
    callToAction: '',
    hashtags: ['#JECON', '#B2BGrowth', '#Leadership'],
    aspectRatio: '9:16',
    status: 'draft',
    scheduledTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16)
  });

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    const matchPlatform = selectedPlatform === 'all' || p.platform === selectedPlatform;
    const matchStatus = 
      selectedStatus === 'all' ||
      (selectedStatus === 'draft' && (p.status === 'draft' || (p.status as any) === 'pending_approval')) ||
      (selectedStatus === 'scheduled' && (p.status === 'scheduled' || (p.status as any) === 'approved')) ||
      (selectedStatus === 'published' && p.status === 'published');
    const matchSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hook.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bodyCopy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlatform && matchStatus && matchSearch;
  });

  const handleCopyClipboard = (post: PostDraft) => {
    const fullText = `${post.hook}\n\n${post.bodyCopy}\n\n${post.callToAction}\n\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopiedId(post.id);
    showInfo('Post payload copied to clipboard for manual dispatch.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleApprove = (post: PostDraft) => {
    onUpdatePost({
      ...post,
      status: 'scheduled',
      scheduledTime: post.scheduledTime || new Date(Date.now() + 86400000).toISOString()
    });
    showSuccess('Post scheduled successfully!', `${post.title}`);
  };

  const handlePublishNow = (post: PostDraft) => {
    onUpdatePost({
      ...post,
      status: 'published',
      metrics: post.metrics || {
        reach: Math.floor(Math.random() * 2000) + 500,
        likes: Math.floor(Math.random() * 120) + 20,
        comments: Math.floor(Math.random() * 15) + 2,
        shares: Math.floor(Math.random() * 8) + 1,
        clicks: Math.floor(Math.random() * 40) + 5,
        engagementRate: 5.2
      }
    });
    showSuccess('Post published live across authorized channel.', `${post.title}`);
  };

  const handleGenerateAi = async () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: aiTopic,
          platform: aiPlatform,
          mediaType: aiMediaType,
          targetAudience: settings.targetAudience,
          toneOfVoice: settings.toneOfVoice,
          brandName: settings.brandName,
          activeCampaign: settings.activeCampaign,
          callToActionGoal: aiCtaGoal,
          isSponsored: aiIsSponsored
        })
      });
      if (!res.ok) throw new Error('AI generation service returned an error.');
      const data = await res.json();
      
      setFormPost({
        title: data.title || `${aiTopic} - ${aiPlatform.toUpperCase()}`,
        platform: aiPlatform,
        mediaType: aiMediaType,
        hook: data.hook || '',
        bodyCopy: data.bodyCopy || '',
        callToAction: data.callToAction || '',
        hashtags: data.hashtags || ['#JECON', '#Leadership'],
        aspectRatio: data.aspectRatio === '9:16' ? '9:16' : '1:1',
        visualPromptSuggestion: data.visualPromptSuggestion,
        status: 'draft',
        scheduledTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16)
      });
      showSuccess('AI draft generated according to campaign settings.');
    } catch (err: any) {
      console.error(err);
      showError(err.message || 'Failed to generate AI post. Using template.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPost.title || !formPost.hook) return;

    if (editingPost) {
      onUpdatePost({
        ...editingPost,
        ...formPost,
        hashtags: typeof formPost.hashtags === 'string' ? (formPost.hashtags as string).split(' ').filter(Boolean) : formPost.hashtags || []
      } as PostDraft);
      setEditingPost(null);
      showSuccess('Post draft saved.');
    } else {
      const newPost: PostDraft = {
        id: `post-${Date.now()}`,
        platform: formPost.platform || 'instagram',
        title: formPost.title || 'Untitled Post',
        mediaType: formPost.mediaType || 'reel',
        hook: formPost.hook || '',
        bodyCopy: formPost.bodyCopy || '',
        callToAction: formPost.callToAction || '',
        hashtags: typeof formPost.hashtags === 'string' ? (formPost.hashtags as string).split(' ').filter(Boolean) : formPost.hashtags || ['#JECON'],
        visualPromptSuggestion: formPost.visualPromptSuggestion,
        aspectRatio: formPost.aspectRatio || '1:1',
        status: (formPost.status as PostStatus) || 'draft',
        scheduledTime: formPost.scheduledTime ? new Date(formPost.scheduledTime).toISOString() : undefined,
        ftcDisclosures: {
          hasSponsoredContent: !!aiIsSponsored,
          hasProperTags: true,
          complianceNotes: 'Standard compliant post draft.'
        },
        createdAt: new Date().toISOString()
      };
      onAddPost(newPost);
      if (newPost.status === 'scheduled') {
        showSuccess('Post scheduled successfully!', `${newPost.title}`);
      } else {
        showSuccess('Post draft saved.', `${newPost.title}`);
      }
    }

    setIsCreateModalOpen(false);
    // Reset
    setFormPost({
      title: '',
      platform: 'instagram',
      mediaType: 'reel',
      hook: '',
      bodyCopy: '',
      callToAction: '',
      hashtags: ['#JECON', '#B2BGrowth', '#Leadership'],
      aspectRatio: '9:16',
      status: 'draft',
      scheduledTime: new Date(Date.now() + 86400000).toISOString().slice(0, 16)
    });
    setAiTopic('');
  };

  const handleDelete = (id: string) => {
    onDeletePost(id);
    showInfo('Post removed from workspace.');
  };

  const openEditModal = (post: PostDraft) => {
    setEditingPost(post);
    setFormPost({
      title: post.title,
      platform: post.platform,
      mediaType: post.mediaType,
      hook: post.hook,
      bodyCopy: post.bodyCopy,
      callToAction: post.callToAction,
      hashtags: post.hashtags,
      aspectRatio: post.aspectRatio,
      visualPromptSuggestion: post.visualPromptSuggestion,
      status: post.status,
      scheduledTime: post.scheduledTime ? new Date(post.scheduledTime).toISOString().slice(0, 16) : ''
    });
    setIsCreateModalOpen(true);
  };

  const getPlatformInfo = (platform: Platform) => {
    switch (platform) {
      case 'facebook': return { name: 'Facebook', badge: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'instagram': return { name: 'Instagram', badge: 'bg-pink-50 text-pink-700 border-pink-200' };
      case 'linkedin': return { name: 'LinkedIn', badge: 'bg-sky-50 text-sky-800 border-sky-200' };
      case 'tiktok': return { name: 'TikTok', badge: 'bg-slate-900 text-white border-slate-700' };
      case 'truth_social': return { name: 'Truth Social', badge: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Content Studio</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage, schedule, and publish cross-platform content for {settings.brandName}.
          </p>
        </div>

        <button
          id="btn-create-post"
          onClick={() => {
            setEditingPost(null);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#0b2545] text-white hover:bg-[#133966] transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Create Post</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-500 mr-2">Status:</span>
          {[
            { id: 'all', label: 'All Posts' },
            { id: 'draft', label: 'Drafts' },
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'published', label: 'Published' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === tab.id
                  ? 'bg-[#0b2545] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Platform Filter & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            id="select-platform-filter"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0284c7]"
          >
            <option value="all">All Channels</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
            <option value="truth_social">Truth Social</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0284c7] w-48 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-sm font-semibold text-slate-700">No posts found</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or click "Create Post" to draft new content.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPosts.map((post) => {
            const pInfo = getPlatformInfo(post.platform);
            const isDraft = post.status === 'draft' || (post.status as any) === 'pending_approval';
            const isScheduled = post.status === 'scheduled' || (post.status as any) === 'approved';
            const isPublished = post.status === 'published';

            return (
              <div 
                key={post.id}
                id={`card-post-${post.id}`}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Card Top Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${pInfo.badge}`}>
                      {pInfo.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 uppercase">
                      {post.mediaType.replace('_', ' ')}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                    isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    isScheduled ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {isPublished ? 'Published' : isScheduled ? 'Scheduled' : 'Draft'}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex-1 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">{post.title}</h3>
                    <p className="text-xs text-sky-800 font-semibold mt-1 line-clamp-2">"{post.hook}"</p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed whitespace-pre-line">
                    {post.bodyCopy}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {post.hashtags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    {post.hashtags.length > 3 && (
                      <span className="text-[11px] text-slate-400">+{post.hashtags.length - 3}</span>
                    )}
                  </div>

                  {/* Scheduled date or metrics preview */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    {post.scheduledTime ? (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(post.scheduledTime).toLocaleDateString()} at {new Date(post.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    ) : (
                      <span>Unscheduled draft</span>
                    )}

                    {isPublished && post.metrics && (
                      <span className="font-semibold text-emerald-700">
                        {post.metrics.reach.toLocaleString()} reach ({post.metrics.engagementRate}%)
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(post)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-200 transition-colors"
                      title="Edit Post"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    
                    {post.platform === 'truth_social' && (
                      <button
                        onClick={() => handleCopyClipboard(post)}
                        className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded hover:bg-purple-100 transition-colors"
                        title="Copy text for manual posting"
                      >
                        {copiedId === post.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === post.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-200 transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isDraft && (
                      <button
                        id={`btn-approve-${post.id}`}
                        onClick={() => handleApprove(post)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0284c7] hover:bg-sky-700 transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    )}

                    {!isPublished && (
                      <button
                        id={`btn-publish-${post.id}`}
                        onClick={() => handlePublishNow(post)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#133966] transition-colors shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Now</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingPost ? 'Edit Post' : 'Create Social Post'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Draft manual copy or generate a calibrated post using AI.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* AI Generator Strip (if creating new) */}
              {!editingPost && (
                <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#0284c7]" />
                    <h4 className="text-xs font-bold text-sky-950">AI Content Generator</h4>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      placeholder="e.g. 3 daily habits of high-growth operators"
                      className="flex-1 px-3 py-2 bg-white border border-sky-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateAi}
                      disabled={isGenerating || !aiTopic.trim()}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0284c7] hover:bg-sky-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors shrink-0 shadow-xs"
                    >
                      {isGenerating ? (
                        <>
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Generate Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Main Form Fields */}
              <form id="form-post-editor" onSubmit={handleSavePost} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Platform */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Channel</label>
                    <select
                      value={formPost.platform}
                      onChange={(e) => setFormPost({ ...formPost, platform: e.target.value as Platform })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    >
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="tiktok">TikTok</option>
                      <option value="facebook">Facebook</option>
                      <option value="truth_social">Truth Social</option>
                    </select>
                  </div>

                  {/* Media Type */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Format</label>
                    <select
                      value={formPost.mediaType}
                      onChange={(e) => setFormPost({ ...formPost, mediaType: e.target.value as MediaType })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    >
                      <option value="reel">9:16 Video / Reel</option>
                      <option value="text_article">Article / Text Post</option>
                      <option value="single_image">Single Image</option>
                      <option value="carousel">Carousel</option>
                    </select>
                  </div>

                  {/* Scheduled Time */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Schedule Date & Time</label>
                    <input
                      type="datetime-local"
                      value={formPost.scheduledTime || ''}
                      onChange={(e) => setFormPost({ ...formPost, scheduledTime: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Post Title / Internal Reference</label>
                  <input
                    type="text"
                    value={formPost.title || ''}
                    onChange={(e) => setFormPost({ ...formPost, title: e.target.value })}
                    placeholder="e.g. Q3 Leadership Framework Reel"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    required
                  />
                </div>

                {/* Hook */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hook (First Line / Headline)</label>
                  <input
                    type="text"
                    value={formPost.hook || ''}
                    onChange={(e) => setFormPost({ ...formPost, hook: e.target.value })}
                    placeholder="e.g. The difference between teams that plateau and scale..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    required
                  />
                </div>

                {/* Body Copy */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Body Copy</label>
                  <textarea
                    rows={4}
                    value={formPost.bodyCopy || ''}
                    onChange={(e) => setFormPost({ ...formPost, bodyCopy: e.target.value })}
                    placeholder="Write the full post text, bullets, and insights here..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    required
                  />
                </div>

                {/* Call to Action */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Call to Action (CTA)</label>
                  <input
                    type="text"
                    value={formPost.callToAction || ''}
                    onChange={(e) => setFormPost({ ...formPost, callToAction: e.target.value })}
                    placeholder="e.g. Comment 'GROWTH' below to receive the playbook"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                </div>

                {/* Hashtags */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hashtags</label>
                  <input
                    type="text"
                    value={Array.isArray(formPost.hashtags) ? formPost.hashtags.join(' ') : formPost.hashtags || ''}
                    onChange={(e) => setFormPost({ ...formPost, hashtags: e.target.value as any })}
                    placeholder="#Leadership #B2B #JECON"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="form-post-editor"
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#133966] rounded-lg shadow-xs transition-colors"
              >
                <Check className="w-4 h-4 text-sky-300" />
                <span>{editingPost ? 'Save Changes' : 'Save Post Draft'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
