import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Filter,
  Plus,
  Eye,
  Send,
  Layers,
  Video,
  Image as ImageIcon,
  Share2,
  X,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PostDraft, Platform } from '../types';

export type CalendarViewMode = 'daily' | 'weekly' | 'monthly';

interface CalendarViewProps {
  posts: PostDraft[];
  onSelectPost?: (post: PostDraft) => void;
  onCreatePostForDate?: (dateStr: string) => void;
}

interface CalendarPostItem {
  id: string;
  originalPost?: PostDraft;
  title: string;
  excerpt: string;
  platform: Platform;
  type: 'Reel' | 'Carousel' | 'Feed' | 'Video' | 'Article';
  status: 'published' | 'scheduled' | 'needs_review' | 'draft';
  date: string; // YYYY-MM-DD
  time: string;
  reach?: string;
  engagement?: string;
}

const PLATFORMS_CONFIG: { id: Platform; name: string; bgActive: string; textActive: string; borderActive: string; badgeClass: string }[] = [
  { 
    id: 'facebook', 
    name: 'Facebook', 
    bgActive: 'bg-[#1877f2]', 
    textActive: 'text-white', 
    borderActive: 'border-[#1877f2]',
    badgeClass: 'bg-blue-600 text-white'
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    bgActive: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500', 
    textActive: 'text-white', 
    borderActive: 'border-pink-500',
    badgeClass: 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
  },
  { 
    id: 'linkedin', 
    name: 'LinkedIn', 
    bgActive: 'bg-[#0077b5]', 
    textActive: 'text-white', 
    borderActive: 'border-[#0077b5]',
    badgeClass: 'bg-sky-700 text-white'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    bgActive: 'bg-black', 
    textActive: 'text-white', 
    borderActive: 'border-black',
    badgeClass: 'bg-slate-900 text-white'
  },
  { 
    id: 'truth_social', 
    name: 'Truth Social', 
    bgActive: 'bg-[#b91c1c]', 
    textActive: 'text-white', 
    borderActive: 'border-[#b91c1c]',
    badgeClass: 'bg-red-700 text-white'
  },
];

export const CalendarView: React.FC<CalendarViewProps> = ({ 
  posts = [],
  onSelectPost,
  onCreatePostForDate
}) => {
  const [viewMode, setViewMode] = useState<CalendarViewMode>('monthly');
  // Current calendar pivot date: default to September 2026
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 8, 1)); // Sept 1, 2026
  
  // Platform Filter toggles: all ON by default
  const [activePlatforms, setActivePlatforms] = useState<Record<Platform, boolean>>({
    facebook: true,
    instagram: true,
    linkedin: true,
    tiktok: true,
    truth_social: true,
  });

  // Selected post for preview drawer
  const [selectedPost, setSelectedPost] = useState<CalendarPostItem | null>(null);

  const togglePlatform = (platform: Platform) => {
    setActivePlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const toggleAllPlatforms = (enable: boolean) => {
    setActivePlatforms({
      facebook: enable,
      instagram: enable,
      linkedin: enable,
      tiktok: enable,
      truth_social: enable,
    });
  };

  // Convert application posts + rich sample posts into standardized CalendarPostItem items
  const calendarItems = useMemo<CalendarPostItem[]>(() => {
    const items: CalendarPostItem[] = [];

    // Map existing posts from App state safely
    if (Array.isArray(posts)) {
      posts.forEach((p: any) => {
        if (!p) return;

        // Determine date from scheduledTime, scheduledFor, or published date or fallback
        let dateStr = '2026-09-01';
        let timeStr = '10:00 AM';

        const scheduleValue = p.scheduledTime || p.scheduledFor;
        if (scheduleValue && typeof scheduleValue === 'string') {
          if (scheduleValue.includes('T')) {
            const [d, t] = scheduleValue.split('T');
            dateStr = d;
            timeStr = t ? t.slice(0, 5) : '10:00 AM';
          } else {
            const parts = scheduleValue.split(' ');
            if (parts[0] && parts[0].includes('-')) {
              dateStr = parts[0];
              timeStr = parts[1] ? `${parts[1]} ${parts[2] || ''}`.trim() : '10:00 AM';
            }
          }
        } else if (p.status === 'published') {
          dateStr = '2026-08-30';
          timeStr = '09:30 AM';
        }

        // Support both p.platforms (array) or p.platform (single value)
        const targetPlatforms: Platform[] = Array.isArray(p.platforms) 
          ? p.platforms 
          : p.platform 
            ? [p.platform] 
            : ['linkedin'];

        targetPlatforms.forEach((plat: Platform) => {
          let type: 'Reel' | 'Carousel' | 'Feed' | 'Video' | 'Article' = 'Feed';
          if (p.mediaType === 'reel' || (p.videoUrl && (plat === 'instagram' || plat === 'tiktok'))) {
            type = 'Reel';
          } else if (p.mediaType === 'video' || p.videoUrl) {
            type = 'Video';
          } else if (p.mediaType === 'carousel' || (p.mediaUrls && p.mediaUrls.length > 1)) {
            type = 'Carousel';
          } else if (p.mediaType === 'text_article' || plat === 'linkedin') {
            type = 'Article';
          }

          let status: 'published' | 'scheduled' | 'needs_review' | 'draft' = 'scheduled';
          if (p.status === 'published') status = 'published';
          else if (p.status === 'scheduled') status = 'scheduled';
          else if (p.status === 'draft') status = 'draft';
          else status = 'needs_review';

          const postCopy = p.bodyCopy || p.text || (p.hook ? `${p.hook}\n\n${p.callToAction || ''}` : '');
          const metrics = p.metrics || p.performanceMetrics;

          items.push({
            id: `${p.id}-${plat}`,
            originalPost: p,
            title: p.title || (postCopy ? postCopy.substring(0, 42) + '...' : 'Untitled Post'),
            excerpt: postCopy,
            platform: plat,
            type,
            status,
            date: dateStr,
            time: timeStr,
            reach: metrics?.reach ? `${(metrics.reach / 1000).toFixed(1)}k` : undefined,
            engagement: metrics?.engagementRate ? `${metrics.engagementRate}%` : undefined
          });
        });
      });
    }

    // Supplement with curated demonstration schedule across August & September 2026
    const sampleAdditions: CalendarPostItem[] = [
      // Past posts (August 28 - August 31)
      {
        id: 'sample-past-1',
        title: 'B2B Growth Engine: Organic vs Paid Attribution',
        excerpt: 'Deconstructing multi-touch attribution for enterprise sales pipelines with real case metrics.',
        platform: 'linkedin',
        type: 'Article',
        status: 'published',
        date: '2026-08-28',
        time: '08:45 AM',
        reach: '24.8k',
        engagement: '6.4%'
      },
      {
        id: 'sample-past-2',
        title: '3 Executive Mistakes in AI Implementation',
        excerpt: 'High-impact breakdown for CIOs and ops directors navigating enterprise tool transitions.',
        platform: 'facebook',
        type: 'Feed',
        status: 'published',
        date: '2026-08-29',
        time: '11:15 AM',
        reach: '18.2k',
        engagement: '4.9%'
      },
      {
        id: 'sample-past-3',
        title: '5 SaaS Metric Red Flags You Cannot Ignore',
        excerpt: 'CAC payback vs Net Dollar Retention: The two metrics board members look at first.',
        platform: 'tiktok',
        type: 'Reel',
        status: 'published',
        date: '2026-08-30',
        time: '02:30 PM',
        reach: '48.9k',
        engagement: '8.2%'
      },
      {
        id: 'sample-past-4',
        title: 'Supplier Ecosystem Announcement & Playbook',
        excerpt: 'Official dispatch announcing our Q3 2026 verified partner program.',
        platform: 'truth_social',
        type: 'Feed',
        status: 'published',
        date: '2026-08-31',
        time: '04:00 PM',
        reach: '12.4k',
        engagement: '5.1%'
      },

      // Today's scheduled posts (September 1, 2026)
      {
        id: 'sample-today-1',
        title: 'AI Scaling Case Study: 40% Ops Efficiency',
        excerpt: 'Real-time telemetry analysis from our latest enterprise deployment rollout.',
        platform: 'linkedin',
        type: 'Article',
        status: 'scheduled',
        date: '2026-09-01',
        time: '09:00 AM',
      },
      {
        id: 'sample-today-2',
        title: 'Behind the Scenes Leadership Masterclass',
        excerpt: 'Live walkthrough with executive operators discussing agile sprint cadence.',
        platform: 'instagram',
        type: 'Reel',
        status: 'scheduled',
        date: '2026-09-01',
        time: '01:30 PM',
      },
      {
        id: 'sample-today-3',
        title: 'Productivity Hacks for Cross-Functional Squads',
        excerpt: 'Streamline team standups and eliminate async blockers with this 3-step ritual.',
        platform: 'facebook',
        type: 'Feed',
        status: 'needs_review',
        date: '2026-09-01',
        time: '05:00 PM',
      },

      // Future posts (September 2 - September 18)
      {
        id: 'sample-fut-1',
        title: 'Vanguard Robotics Automation Teaser',
        excerpt: 'Co-branded spotlight on physical AI and automated distribution centers.',
        platform: 'tiktok',
        type: 'Reel',
        status: 'scheduled',
        date: '2026-09-02',
        time: '11:00 AM',
      },
      {
        id: 'sample-fut-2',
        title: 'Cyber Defense Architecture in Multi-Cloud',
        excerpt: 'Zero trust security framework overview for fintech infrastructure.',
        platform: 'linkedin',
        type: 'Carousel',
        status: 'scheduled',
        date: '2026-09-03',
        time: '10:15 AM',
      },
      {
        id: 'sample-fut-3',
        title: 'Quarterly Executive Town Hall Highlights',
        excerpt: 'Key themes from our keynote on sustainable enterprise ARR expansion.',
        platform: 'truth_social',
        type: 'Feed',
        status: 'scheduled',
        date: '2026-09-04',
        time: '02:00 PM',
      },
      {
        id: 'sample-fut-4',
        title: 'Weekend Leadership Reading List: 5 Must-Reads',
        excerpt: 'Curated industry papers on organizational resilience and talent architecture.',
        platform: 'instagram',
        type: 'Carousel',
        status: 'draft',
        date: '2026-09-06',
        time: '09:00 AM',
      },
      {
        id: 'sample-fut-5',
        title: 'Apex Cloud Systems Integration Webinar',
        excerpt: 'Join our senior architects live to explore automated pipeline synchronization.',
        platform: 'linkedin',
        type: 'Article',
        status: 'scheduled',
        date: '2026-09-08',
        time: '01:00 PM',
      },
      {
        id: 'sample-fut-6',
        title: 'Interactive Q&A: Enterprise Procurement Secrets',
        excerpt: 'Answering common founder questions on navigating enterprise RFPs.',
        platform: 'facebook',
        type: 'Feed',
        status: 'scheduled',
        date: '2026-09-10',
        time: '03:30 PM',
      },
      {
        id: 'sample-fut-7',
        title: 'Mid-Month Social Reach & Attribution Report',
        excerpt: 'Transparent transparency update on our campaign performance indices.',
        platform: 'linkedin',
        type: 'Carousel',
        status: 'scheduled',
        date: '2026-09-15',
        time: '11:00 AM',
      }
    ];

    // Combine avoiding exact duplicates
    sampleAdditions.forEach(sa => {
      if (!items.some(it => it.title === sa.title && it.platform === sa.platform)) {
        items.push(sa);
      }
    });

    return items;
  }, [posts]);

  // Filter items by selected platforms
  const filteredItems = useMemo(() => {
    return calendarItems.filter(item => activePlatforms[item.platform]);
  }, [calendarItems, activePlatforms]);

  // Navigation handlers
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'monthly') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'monthly') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 8, 1)); // Sept 1, 2026 is benchmark "today"
  };

  // Helper date calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate days matrix for monthly view
  const monthDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthTotalDays - i;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        isPast: true,
        isToday: dateStr === '2026-09-01'
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateStr === '2026-09-01';
      const isPast = dateStr < '2026-09-01';
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        isPast,
        isToday
      });
    }

    // Next month padding (complete grid of 35 or 42 cells)
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remainingCells; d++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        isPast: false,
        isToday: dateStr === '2026-09-01'
      });
    }

    return days;
  }, [year, month]);

  // Generate days for weekly view (7 days containing currentDate)
  const weekDays = useMemo(() => {
    const curr = new Date(currentDate);
    const dayOfWeek = curr.getDay();
    const startOfWeek = new Date(curr);
    startOfWeek.setDate(curr.getDate() - dayOfWeek);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const isToday = dateStr === '2026-09-01';
      const isPast = dateStr < '2026-09-01';
      days.push({
        dayNumber: d.getDate(),
        dateStr,
        dayName: daysOfWeek[i],
        isToday,
        isPast
      });
    }
    return days;
  }, [currentDate]);

  // Daily View Target Date
  const dailyDateStr = useMemo(() => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  }, [currentDate]);

  const allActiveCount = Object.values(activePlatforms).filter(Boolean).length;

  return (
    <div id="social-marketing-calendar" className="space-y-6">
      {/* Top Controls: Platform Filters & View Switcher */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4 sm:p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Platform Toggle Pills Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#0284c7]" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Channel Filters ({allActiveCount}/5 active)
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => toggleAllPlatforms(true)}
                  className="text-slate-500 hover:text-[#0284c7] font-semibold text-[11px] cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-300">•</span>
                <button
                  type="button"
                  onClick={() => toggleAllPlatforms(false)}
                  className="text-slate-500 hover:text-rose-600 font-semibold text-[11px] cursor-pointer"
                >
                  Mute All
                </button>
              </div>
            </div>

            {/* Platform Toggle Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {PLATFORMS_CONFIG.map(plat => {
                const isActive = activePlatforms[plat.id];
                return (
                  <button
                    key={plat.id}
                    id={`filter-platform-${plat.id}`}
                    type="button"
                    onClick={() => togglePlatform(plat.id)}
                    className={`group px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all border cursor-pointer ${
                      isActive
                        ? `${plat.bgActive} ${plat.textActive} ${plat.borderActive} shadow-xs`
                        : 'bg-slate-100/80 text-slate-400 border-slate-200 hover:bg-slate-200/70 hover:text-slate-600'
                    }`}
                  >
                    <span>{plat.name}</span>
                    <span 
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive ? 'bg-white shadow-xs' : 'bg-slate-300 group-hover:bg-slate-400'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* View Switcher & Date Controls */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            {/* View Mode Toggle Switcher */}
            <div className="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200/80">
              {(['daily', 'weekly', 'monthly'] as const).map(mode => (
                <button
                  key={mode}
                  id={`btn-calendar-mode-${mode}`}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 text-xs font-semibold capitalize rounded-md transition-all cursor-pointer ${
                    viewMode === mode
                      ? 'bg-[#0b2545] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg p-1">
              <button
                id="btn-calendar-prev"
                type="button"
                onClick={handlePrev}
                className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="btn-calendar-today"
                type="button"
                onClick={handleToday}
                className="px-2.5 py-1 text-xs font-bold rounded-md bg-white border border-slate-200/80 text-slate-800 hover:bg-slate-100 shadow-2xs transition-colors cursor-pointer"
              >
                Today (Sept 1)
              </button>
              <button
                id="btn-calendar-next"
                type="button"
                onClick={handleNext}
                className="p-1.5 rounded-md hover:bg-white text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View Body */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Calendar Month/Range Title Header */}
        <div className="p-4 sm:px-6 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center text-[#0284c7]">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {viewMode === 'monthly' && `${monthNames[month]} ${year}`}
                {viewMode === 'weekly' && `Week of ${weekDays[0].dateStr} — ${weekDays[6].dateStr}`}
                {viewMode === 'daily' && `Schedule for ${dailyDateStr}`}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {filteredItems.length} total scheduled / distributed post entries matching active filters
              </p>
            </div>
          </div>

          {/* Quick Legend */}
          <div className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 border border-slate-400"></span>
              <span>Past (Published)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] ring-2 ring-sky-200"></span>
              <span className="text-[#0284c7] font-bold">Today</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-400"></span>
              <span>Future (Scheduled)</span>
            </span>
          </div>
        </div>

        {/* 1. MONTHLY VIEW */}
        {viewMode === 'monthly' && (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Day header */}
              <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-100/70 text-center text-xs font-bold text-slate-700 py-2.5">
                {daysOfWeek.map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              {/* Day cells matrix */}
              <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-200">
                {monthDays.map((d, idx) => {
                  const dayPosts = filteredItems.filter(item => item.date === d.dateStr);

                  return (
                    <div
                      key={idx}
                      className={`min-h-[140px] p-2 transition-colors flex flex-col justify-between ${
                        d.isToday 
                          ? 'bg-sky-50/40 ring-2 ring-inset ring-[#0284c7]' 
                          : d.isPast 
                            ? 'bg-slate-100/50' 
                            : d.isCurrentMonth 
                              ? 'bg-white hover:bg-slate-50/50' 
                              : 'bg-slate-50/40 text-slate-400'
                      }`}
                    >
                      {/* Date header */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-xs font-bold inline-flex items-center justify-center ${
                            d.isToday
                              ? 'w-6 h-6 rounded-full bg-[#0284c7] text-white shadow-xs'
                              : d.isCurrentMonth
                                ? 'text-slate-800'
                                : 'text-slate-400'
                          }`}
                        >
                          {d.dayNumber}
                        </span>

                        {d.isToday && (
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#0284c7] bg-sky-100 px-1.5 py-0.5 rounded">
                            Today
                          </span>
                        )}

                        {dayPosts.length > 0 && (
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/70 px-1.5 py-0.2 rounded-full">
                            {dayPosts.length}
                          </span>
                        )}
                      </div>

                      {/* Post cards list inside cell */}
                      <div className="space-y-1.5 overflow-y-auto max-h-[105px] pr-0.5 scrollbar-thin">
                        {dayPosts.map((post) => {
                          const config = PLATFORMS_CONFIG.find(c => c.id === post.platform);
                          return (
                            <button
                              key={post.id}
                              type="button"
                              onClick={() => setSelectedPost(post)}
                              className="w-full text-left p-1.5 rounded-lg border border-slate-200 bg-white hover:border-sky-400 hover:shadow-xs transition-all block cursor-pointer group"
                            >
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${config?.badgeClass || 'bg-slate-700 text-white'}`}>
                                  {config?.name.substring(0, 3)}
                                </span>
                                <span className="text-[9px] text-slate-500 flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  {post.time.split(' ')[0]}
                                </span>
                              </div>
                              <p className="text-[11px] font-semibold text-slate-900 truncate leading-tight group-hover:text-[#0284c7]">
                                {post.title}
                              </p>
                              <div className="flex items-center justify-between text-[9px] mt-1 pt-0.5 border-t border-slate-100">
                                <span className="text-slate-500 font-medium">{post.type}</span>
                                <span className={`px-1 rounded-full font-semibold ${
                                  post.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                                  post.status === 'scheduled' ? 'bg-sky-100 text-sky-800' :
                                  post.status === 'needs_review' ? 'bg-amber-100 text-amber-900' :
                                  'bg-slate-100 text-slate-700'
                                }`}>
                                  {post.status.replace('_', ' ')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Add Post Button for empty future cells */}
                      {dayPosts.length === 0 && !d.isPast && d.isCurrentMonth && (
                        <div className="text-center pt-2">
                          <button
                            type="button"
                            onClick={() => onCreatePostForDate?.(d.dateStr)}
                            className="opacity-0 hover:opacity-100 group-hover:opacity-100 text-[10px] text-slate-400 hover:text-sky-600 font-medium transition-opacity inline-flex items-center gap-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Post
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. WEEKLY VIEW */}
        {viewMode === 'weekly' && (
          <div className="p-4 sm:p-6 overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3 min-w-[700px]">
              {weekDays.map((day, idx) => {
                const dayPosts = filteredItems.filter(item => item.date === day.dateStr);

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-3 flex flex-col justify-between min-h-[360px] ${
                      day.isToday
                        ? 'border-[#0284c7] bg-sky-50/40 ring-2 ring-sky-200'
                        : day.isPast
                          ? 'border-slate-200 bg-slate-100/50'
                          : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      {/* Day Header */}
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200/80">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase">{day.dayName}</span>
                          <h4 className="text-base font-extrabold text-slate-900">{day.dayNumber}</h4>
                        </div>
                        {day.isToday && (
                          <span className="text-[10px] font-bold bg-[#0284c7] text-white px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </div>

                      {/* Day Posts List */}
                      <div className="space-y-2">
                        {dayPosts.map((post) => {
                          const config = PLATFORMS_CONFIG.find(c => c.id === post.platform);
                          return (
                            <button
                              key={post.id}
                              type="button"
                              onClick={() => setSelectedPost(post)}
                              className="w-full text-left p-2.5 rounded-lg border border-slate-200 bg-white hover:border-[#0284c7] hover:shadow-xs transition-all block cursor-pointer space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${config?.badgeClass || 'bg-slate-700 text-white'}`}>
                                  {config?.name}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium">
                                  {post.time}
                                </span>
                              </div>
                              <p className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                                {post.title}
                              </p>
                              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-100">
                                <span className="text-slate-500">{post.type}</span>
                                <span className={`px-1.5 py-0.2 rounded-full font-semibold ${
                                  post.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                                  post.status === 'scheduled' ? 'bg-sky-100 text-sky-800' :
                                  post.status === 'needs_review' ? 'bg-amber-100 text-amber-900' :
                                  'bg-slate-100 text-slate-700'
                                }`}>
                                  {post.status.replace('_', ' ')}
                                </span>
                              </div>
                            </button>
                          );
                        })}

                        {dayPosts.length === 0 && (
                          <div className="py-8 text-center text-xs text-slate-400">
                            No posts scheduled
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onCreatePostForDate?.(day.dateStr)}
                      className="w-full mt-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg border border-dashed border-slate-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Schedule
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. DAILY VIEW */}
        {viewMode === 'daily' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h4 className="text-base font-bold text-slate-900">Timeline for {dailyDateStr}</h4>
                <p className="text-xs text-slate-500">Chronological distribution breakdown across active channels</p>
              </div>
              <button
                type="button"
                onClick={() => onCreatePostForDate?.(dailyDateStr)}
                className="px-3 py-1.5 rounded-lg bg-[#0b2545] hover:bg-[#133966] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> New Post for Date
              </button>
            </div>

            {/* Daily timeline items */}
            {(() => {
              const dayPosts = filteredItems.filter(item => item.date === dailyDateStr);
              if (dayPosts.length === 0) {
                return (
                  <div className="p-12 text-center text-slate-500 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 space-y-2">
                    <CalendarIcon className="w-8 h-8 text-slate-300 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700">No social posts queued for this date.</p>
                    <p className="text-xs text-slate-400">Click the button above to schedule content directly for {dailyDateStr}.</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dayPosts.map((post) => {
                    const config = PLATFORMS_CONFIG.find(c => c.id === post.platform);
                    return (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0284c7] hover:shadow-xs transition-all space-y-3 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${config?.badgeClass || 'bg-slate-700 text-white'}`}>
                            {config?.name}
                          </span>
                          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.time}
                          </span>
                        </div>

                        <div>
                          <h5 className="font-bold text-sm text-slate-900 line-clamp-1">{post.title}</h5>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1">{post.excerpt}</p>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                          <span className="text-slate-500 font-medium">{post.type}</span>
                          <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            post.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                            post.status === 'scheduled' ? 'bg-sky-100 text-sky-800' :
                            post.status === 'needs_review' ? 'bg-amber-100 text-amber-900' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {post.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* Quick Preview & Edit Drawer Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0b2545] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  PLATFORMS_CONFIG.find(c => c.id === selectedPost.platform)?.badgeClass || 'bg-slate-700 text-white'
                }`}>
                  {PLATFORMS_CONFIG.find(c => c.id === selectedPost.platform)?.name}
                </span>
                <span className="text-xs text-sky-200">• {selectedPost.type}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-lg text-sky-200 hover:text-white hover:bg-[#133966] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Target</span>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 mt-0.5">
                  <Clock className="w-4 h-4 text-[#0284c7]" />
                  <span>{selectedPost.date} at {selectedPost.time}</span>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold capitalize ${
                    selectedPost.status === 'published' ? 'bg-emerald-100 text-emerald-800' :
                    selectedPost.status === 'scheduled' ? 'bg-sky-100 text-sky-800' :
                    'bg-amber-100 text-amber-900'
                  }`}>
                    {selectedPost.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Title / Headline</span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">{selectedPost.title}</h4>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Post Copy & Disclosures</span>
                <div className="mt-1 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                  {selectedPost.excerpt}
                </div>
              </div>

              {selectedPost.reach && (
                <div className="grid grid-cols-2 gap-3 p-3 bg-sky-50/50 rounded-xl border border-sky-100">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Attributed Reach</span>
                    <p className="text-sm font-bold text-[#0b2545]">{selectedPost.reach}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Engagement Rate</span>
                    <p className="text-sm font-bold text-[#0284c7]">{selectedPost.engagement}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                Close
              </button>

              {selectedPost.originalPost && onSelectPost && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectPost(selectedPost.originalPost!);
                    setSelectedPost(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 rounded-lg transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Open in Content Studio
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CalendarView;
