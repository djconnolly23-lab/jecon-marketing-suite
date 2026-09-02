import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Copy, 
  Check, 
  ExternalLink, 
  ThumbsUp, 
  Send, 
  ShieldCheck, 
  Play,
  Music,
  CheckCircle2,
  Calendar,
  Sparkles,
  Edit2
} from 'lucide-react';
import { PostDraft, Platform } from '../types';

interface PostPreviewCardProps {
  post: PostDraft;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onSchedule?: (id: string) => void;
  onPublishNow?: (id: string) => void;
  onEdit?: (post: PostDraft) => void;
  showActions?: boolean;
}

export const PostPreviewCard: React.FC<PostPreviewCardProps> = ({
  post,
  onApprove,
  onReject,
  onSchedule,
  onPublishNow,
  onEdit,
  showActions = true,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopyClipboard = () => {
    const fullText = `${post.hook}\n\n${post.bodyCopy}\n\n${post.callToAction}\n\n${post.hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPlatformBadge = (platform: Platform) => {
    switch (platform) {
      case 'facebook': return { bg: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-600', name: 'Facebook' };
      case 'instagram': return { bg: 'bg-pink-50 text-pink-700 border-pink-200', dot: 'bg-pink-600', name: 'Instagram' };
      case 'linkedin': return { bg: 'bg-sky-50 text-sky-800 border-sky-200', dot: 'bg-sky-700', name: 'LinkedIn' };
      case 'tiktok': return { bg: 'bg-slate-900 text-white border-slate-700', dot: 'bg-white', name: 'TikTok' };
      case 'truth_social': return { bg: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-600', name: 'Truth Social' };
    }
  };

  const pBadge = getPlatformBadge(post.platform);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
      {/* Header status bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${pBadge.dot}`} />
          <span className="font-bold text-slate-800 uppercase text-[11px] tracking-wide">
            {pBadge.name} • {post.mediaType.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
            post.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            post.status === 'scheduled' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
            post.status === 'pending_approval' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
            post.status === 'published' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
            'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {post.status.replace('_', ' ').toUpperCase()}
          </span>

          <button
            onClick={handleCopyClipboard}
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors"
            title="Copy copy text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Platform Mock Body */}
      <div className="p-4 flex-1">
        {/* Instagram Reel & TikTok Vertical Mockup */}
        {(post.platform === 'instagram' || post.platform === 'tiktok') && post.aspectRatio === '9:16' ? (
          <div className="bg-slate-900 text-white rounded-lg p-4 relative overflow-hidden flex flex-col justify-between min-h-[290px] border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-[11px] bg-slate-800/90 px-2 py-0.5 rounded">
                9:16 Video Format
              </span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Music className="w-3 h-3 text-pink-400" />
                <span>Audio • JECON HQ</span>
              </div>
            </div>

            {/* Simulated Reel Center Hook */}
            <div className="my-5 text-center px-3">
              <div className="inline-block p-3 rounded-lg bg-black/60 backdrop-blur-xs border border-white/10 max-w-xs">
                <p className="text-xs font-bold text-sky-200 tracking-tight leading-snug">
                  "{post.hook}"
                </p>
                <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-300">
                  <Play className="w-3 h-3 fill-current text-white" />
                  <span>Hook: 0-3s</span>
                </div>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="space-y-1.5 z-10">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#0284c7] flex items-center justify-center font-bold text-[10px]">
                  J
                </div>
                <span className="text-xs font-bold">@jecon_official</span>
              </div>
              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                {post.bodyCopy}
              </p>
              <div className="flex flex-wrap gap-1 text-[11px] text-sky-300">
                {post.hashtags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ) : post.platform === 'linkedin' ? (
          /* LinkedIn Professional Mockup */
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-sky-700 text-white font-bold flex items-center justify-center text-xs">
                J
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">JECON LLC</h4>
                <p className="text-[11px] text-slate-500">14,200 followers • 🌐</p>
              </div>
            </div>

            <div className="text-xs text-slate-800 space-y-2 leading-relaxed whitespace-pre-line font-sans">
              <p className="font-semibold text-slate-950">{post.hook}</p>
              <p>{expanded ? post.bodyCopy : post.bodyCopy.slice(0, 170) + '...'}</p>
              {post.bodyCopy.length > 170 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sky-700 hover:text-sky-900 font-semibold text-xs inline-block"
                >
                  {expanded ? 'Show less' : '...see more'}
                </button>
              )}
              <p className="text-sky-900 font-medium">{post.callToAction}</p>
              <div className="flex flex-wrap gap-1 text-sky-700 font-medium text-[11px]">
                {post.hashtags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5 text-sky-600" /> 382 Reactions
              </span>
              <span>48 comments • 19 reposts</span>
            </div>
          </div>
        ) : post.platform === 'truth_social' ? (
          /* Truth Social Manual Clipboard Card */
          <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                MANUAL DISPATCH
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {post.bodyCopy.length} / 500 chars
              </span>
            </div>

            <div className="bg-white p-3 rounded border border-purple-100 text-xs text-slate-800 space-y-1.5">
              <p className="font-semibold text-slate-900">{post.hook}</p>
              <p className="leading-relaxed">{post.bodyCopy}</p>
              <p className="text-purple-800 font-medium">{post.callToAction}</p>
              <div className="text-purple-600 text-[11px]">{post.hashtags.join(' ')}</div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Ready to copy into post field</span>
              <button
                onClick={handleCopyClipboard}
                className="flex items-center gap-1 text-purple-700 font-semibold hover:underline"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Facebook Feed Mockup */
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                J
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">JECON LLC</h4>
                <p className="text-[11px] text-slate-500">Official Page • Just now • 🌍</p>
              </div>
            </div>

            <div className="text-xs text-slate-800 space-y-1.5 leading-relaxed">
              <p className="font-semibold text-slate-900">{post.hook}</p>
              <p className="whitespace-pre-line">{post.bodyCopy}</p>
              <p className="text-blue-700 font-semibold">{post.callToAction}</p>
              <div className="flex flex-wrap gap-1 text-blue-600 text-[11px]">
                {post.hashtags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-xs text-slate-600">
              <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <ThumbsUp className="w-3.5 h-3.5" /> Like
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <MessageCircle className="w-3.5 h-3.5" /> Comment
              </span>
              <span className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                <Share2 className="w-3.5 h-3.5" /> Share
              </span>
            </div>
          </div>
        )}

        {/* FTC Compliance Status Badge */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>FTC Disclosure: {post.ftcDisclosures?.hasProperTags !== false ? 'Compliant' : 'Needs Review'}</span>
          </div>
          {post.scheduledTime && (
            <span className="text-slate-500 font-mono text-[10px]">
              {new Date(post.scheduledTime).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          {post.status === 'pending_approval' ? (
            <>
              <button
                id={`btn-reject-${post.id}`}
                onClick={() => onReject && onReject(post.id)}
                className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded border border-slate-200 transition-colors"
              >
                Reject Draft
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  id={`btn-approve-${post.id}`}
                  onClick={() => onApprove && onApprove(post.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#0284c7] hover:bg-sky-700 rounded-md shadow-xs transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
              </div>
            </>
          ) : post.status === 'approved' ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  id={`btn-publish-${post.id}`}
                  onClick={() => onPublishNow ? onPublishNow(post.id) : onSchedule && onSchedule(post.id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#0b2545] hover:bg-[#133966] rounded-md shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Now</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full text-xs text-slate-500">
              <span>Status: <strong className="text-slate-800">{post.status.toUpperCase()}</strong></span>
              {post.platform === 'truth_social' ? (
                <button
                  onClick={handleCopyClipboard}
                  className="text-purple-700 font-semibold hover:underline"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              ) : (
                <span className="text-emerald-700 font-medium">Live on Channel</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
