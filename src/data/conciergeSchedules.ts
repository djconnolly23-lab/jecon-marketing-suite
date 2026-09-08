// DAKO Concierge Tiers Weekly Schedule Allocations

export interface ScheduleBlock {
  label: string;
  task: string;
  detail: string;
}

export interface DaySchedule {
  day: string;
  totalHours: string;
  blocks: ScheduleBlock[];
  flexNote?: string;
}

export const CONCIERGE_SCHEDULES: Record<string, DaySchedule[]> = {
  'Marketer 10': [
    {
      day: 'Monday',
      totalHours: '2.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage', detail: 'Reviewing and responding to core-channel client/customer inquiries.' },
        { label: 'Hour 2', task: 'Content Calendar Upkeep', detail: 'Organizing assets and confirming the week’s posting slots.' },
      ],
    },
    {
      day: 'Tuesday',
      totalHours: '2.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage', detail: 'Core-channel inquiry review and response.' },
        { label: 'Hour 2', task: 'Email Follow-Ups', detail: 'Routine follow-ups and basic lead acknowledgments.' },
      ],
    },
    {
      day: 'Wednesday',
      totalHours: '2.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage', detail: 'Core-channel inquiry review and response.' },
        { label: 'Hour 2', task: 'Scheduled Social Post', detail: 'Publishing one of the week’s 1–2 scheduled posts.' },
      ],
    },
    {
      day: 'Thursday',
      totalHours: '2.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage', detail: 'Core-channel inquiry review and response.' },
        { label: 'Hour 2', task: 'Contact Imports & Reporting', detail: 'Initial contact imports and a basic platform reporting check.' },
      ],
    },
    {
      day: 'Friday',
      totalHours: '2.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage & Week Wrap-Up', detail: 'Closing out open threads before the weekend.' },
        { label: 'Hour 2', task: 'Next-Week Calendar Prep', detail: 'Lining up asset organization for the following week.' },
      ],
    },
  ],

  'Marketer 20': [
    {
      day: 'Monday',
      totalHours: '4.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage & Vendor Coordination', detail: 'Core-channel triage plus vendor/ad-platform coordination.' },
        { label: 'Hour 2', task: 'Ad Campaign Setup', detail: 'Initial ad campaign configuration and lead-tracking implementation.' },
        { label: 'Hour 3', task: 'Scheduled Social Post', detail: 'Publishing toward the week’s 3–4 tailored posts.' },
        { label: 'Hour 4', task: 'Automated Touchpoint Setup', detail: 'Deploying booking-reminder and check-in touchpoint sequences.' },
      ],
    },
    {
      day: 'Tuesday',
      totalHours: '4.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage', detail: 'Core-channel inquiry review and response.' },
        { label: 'Hour 2', task: 'Lead-Tracking Review', detail: 'Confirming ad-platform lead-tracking is firing correctly.' },
        { label: 'Hour 3', task: 'Scheduled Social Post', detail: 'Publishing toward the week’s post target.' },
        { label: 'Hour 4', task: 'Custom Audience Segmentation', detail: 'Structuring custom audience segments for targeted marketing.' },
      ],
    },
    {
      day: 'Wednesday',
      totalHours: '4.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage & Ad-Platform Sync', detail: 'Core-channel triage plus ad-platform coordination.' },
        { label: 'Hour 2', task: 'Ad Performance Check-In', detail: 'Reviewing early campaign performance and basic configuration.' },
        { label: 'Hour 3', task: 'Scheduled Social Post', detail: 'Publishing toward the week’s post target.' },
        { label: 'Hour 4', task: 'Client Touchpoint Follow-Ups', detail: 'Checking in on automated touchpoint sequences.' },
      ],
    },
    {
      day: 'Thursday',
      totalHours: '4.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage', detail: 'Core-channel inquiry review and response.' },
        { label: 'Hour 2', task: 'Ad Budget Review', detail: 'Checking spend against initial campaign configuration.' },
        { label: 'Hour 3', task: 'Scheduled Social Post', detail: 'Publishing the week’s 4th post, if scheduled.' },
        { label: 'Hour 4', task: 'Standard Reporting Prep', detail: 'Pulling data for the week’s standard platform report.' },
      ],
    },
    {
      day: 'Friday',
      totalHours: '4.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Message Triage & Week Wrap-Up', detail: 'Closing out open threads before the weekend.' },
        { label: 'Hour 2', task: 'Ad Campaign Adjustments', detail: 'End-of-week configuration tweaks based on early signal.' },
        { label: 'Hour 3', task: 'Segment Review & Cleanup', detail: 'Reviewing custom audience segments for accuracy.' },
        { label: 'Hour 4', task: 'Standard Report Delivery', detail: 'Sending the week’s standard platform reporting summary.' },
      ],
    },
  ],

  'Marketer 30': [
    {
      day: 'Monday',
      totalHours: '6.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Client Communications', detail: 'Comprehensive communication management and proactive scheduling.' },
        { label: 'Hour 2', task: 'Blog Post Drafting', detail: 'Deep content creation for the week’s blog output.' },
        { label: 'Hour 3', task: 'Organic Growth Strategy', detail: 'Executing organic growth initiatives for the week.' },
        { label: 'Hour 4', task: 'Search Optimization', detail: 'Ongoing search optimization tasks.' },
        { label: 'Hour 5', task: 'Automated Workflow Management', detail: 'Managing workflow templates that nurture cold leads.' },
        { label: 'Hour 6', task: 'Metric Audit Prep', detail: 'Prepping for the week’s performance tracking.' },
      ],
    },
    {
      day: 'Tuesday',
      totalHours: '6.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Client Communications', detail: 'Ongoing client communication management.' },
        { label: 'Hour 2', task: 'Newsletter Drafting', detail: 'Drafting the week’s newsletter content.' },
        { label: 'Hour 3', task: 'Organic Growth — Keyword Research', detail: 'Search optimization research to support growth strategy.' },
        { label: 'Hour 4', task: 'Email Sequence Build', detail: 'Building out a multi-step email sequence.' },
        { label: 'Hour 5', task: 'Cold Lead Nurture Review', detail: 'Reviewing automated workflow templates for lead nurture.' },
        { label: 'Hour 6', task: 'Analytics Check-In', detail: 'Mid-week performance tracking review.' },
      ],
    },
    {
      day: 'Wednesday',
      totalHours: '6.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Client Communications & Scheduling', detail: 'Proactive campaign scheduling with clients.' },
        { label: 'Hour 2', task: 'Blog Post Editing & Publishing', detail: 'Finalizing and publishing blog content.' },
        { label: 'Hour 3', task: 'Search Optimization', detail: 'Continued organic growth and SEO tasks.' },
        { label: 'Hour 4', task: 'Email Sequence Testing', detail: 'Testing the multi-step email sequence.' },
        { label: 'Hour 5', task: 'Workflow Refinement', detail: 'Refining automated nurture workflow templates.' },
        { label: 'Hour 6', task: 'Mid-Week Metrics Pulse', detail: 'Checking in on weekly analytics reporting.' },
      ],
    },
    {
      day: 'Thursday',
      totalHours: '6.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Client Communications', detail: 'Ongoing client communication management.' },
        { label: 'Hour 2', task: 'Newsletter Finalization & Send', detail: 'Sending the week’s completed newsletter.' },
        { label: 'Hour 3', task: 'Organic Growth Adjustments', detail: 'Adjusting growth strategy based on early results.' },
        { label: 'Hour 4', task: 'Sequence Monitoring', detail: 'Monitoring the live multi-step email sequence.' },
        { label: 'Hour 5', task: 'Lead Nurture Optimization', detail: 'Optimizing workflow templates converting cold leads.' },
        { label: 'Hour 6', task: 'Performance Tracking', detail: 'Weekly metric audit and analytics reporting.' },
      ],
    },
    {
      day: 'Friday',
      totalHours: '6.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Client Communications & Wrap-Up', detail: 'Closing out the week’s client communications.' },
        { label: 'Hour 2', task: 'Next-Week Content Planning', detail: 'Planning blog and newsletter content for next week.' },
        { label: 'Hour 3', task: 'Search Optimization Review', detail: 'Reviewing the week’s SEO progress.' },
        { label: 'Hour 4', task: 'Email Sequence Reporting', detail: 'Reporting on multi-step email sequence performance.' },
        { label: 'Hour 5', task: 'Workflow Template Cleanup', detail: 'Cleaning up automated nurture workflow templates.' },
        { label: 'Hour 6', task: 'Detailed Analytics Report', detail: 'Delivering the week’s detailed analytics report.' },
      ],
    },
  ],

  'Marketer 40': [
    {
      day: 'Monday',
      totalHours: '5.75 Hours',
      blocks: [
        { label: 'Hour 1', task: 'SLA & Daily Monitoring', detail: 'Morning sweep of all systems, validating 15-minute SLA responsiveness across customer touchpoints.' },
        { label: 'Hour 2', task: 'Full-Funnel Execution (Ads)', detail: 'Managing multi-channel paid acquisition campaigns, adjusting budgets, and tracking acquisition costs.' },
        { label: 'Hour 3', task: 'Cross-Platform Social Mgmt', detail: 'Overseeing community engagement, brand mentions, and proactive reputation management.' },
        { label: 'Hour 4', task: 'Localized SEO & Funnel Ops', detail: 'Optimizing local search rankings, metadata, and landing page conversion paths.' },
        { label: 'Hour 5', task: 'Workflow Architecture', detail: 'Building and refining advanced automated funnels and lead-scoring structures.' },
      ],
      flexNote: '35 Mins: Strategic alignment notes for the weekly execution pipeline.',
    },
    {
      day: 'Tuesday',
      totalHours: '5.75 Hours',
      blocks: [
        { label: 'Hour 1', task: 'SLA Monitoring & Triage', detail: 'High-priority message triage and active pipeline maintenance across all channels.' },
        { label: 'Hour 2', task: 'Paid Ads Scale & Testing', detail: 'Reviewing creative variations, split-testing ad copy, and scaling high-performing ad sets.' },
        { label: 'Hour 3', task: 'Content & Community Ops', detail: 'Managing social community discussions, influencer/partner coordination, and post syndication.' },
        { label: 'Hour 4', task: 'SEO & Organic Expansion', detail: 'Technical SEO audits, site speed checks, and keyword optimization initiatives.' },
        { label: 'Hour 5', task: 'Custom Dashboard Maintenance', detail: 'Building and updating custom, advanced reporting dashboards tailored to core business KPIs.' },
      ],
    },
    {
      day: 'Wednesday',
      totalHours: '5.75 Hours',
      blocks: [
        { label: 'Hour 1', task: 'SLA & Daily Monitoring', detail: 'Real-time channel tracking, customer query resolution, and lead escalation routing.' },
        { label: 'Hour 2', task: 'Full-Funnel Ad Optimization', detail: 'Cross-referencing ad metrics with CRM conversions to calculate true return on ad spend (ROAS).' },
        { label: 'Hour 3', task: 'Cross-Platform Management', detail: 'Publishing strategic brand campaigns and managing cross-channel engagement streams.' },
        { label: 'Hour 4', task: 'Advanced SEO Strategy', detail: 'Structuring internal content pillars and optimizing high-intent conversion pages.' },
        { label: 'Hour 5', task: 'CRM & Database Health', detail: 'Deep-cleaning custom segments, updating tags, and optimizing high-value customer pipelines.' },
      ],
      flexNote: '35 Mins: Mid-week pipeline throughput check.',
    },
    {
      day: 'Thursday',
      totalHours: '5.75 Hours',
      blocks: [
        { label: 'Hour 1', task: 'SLA Monitoring & Triage', detail: 'Continuous performance auditing and rapid response handling for incoming leads.' },
        { label: 'Hour 2', task: 'Paid Acquisition Review', detail: 'Adjusting bidding strategies, keyword targets, and geographic parameters for active ad campaigns.' },
        { label: 'Hour 3', task: 'Community & Reputation Ops', detail: 'Proactive reputation monitoring, review management, and social listening tasks.' },
        { label: 'Hour 4', task: 'Localized SEO Execution', detail: 'Managing local directory syncs, map optimizations, and localized link-building actions.' },
        { label: 'Hour 5', task: 'Custom Dashboarding & Data', detail: 'Refining real-time data visualizers and executive-level performance metrics views.' },
      ],
    },
    {
      day: 'Friday',
      totalHours: '5.75 Hours',
      blocks: [
        { label: 'Hour 1', task: 'SLA Monitoring & Wrap-Up', detail: 'End-of-week communications sweep, ensuring zero loose ends in the support pipeline.' },
        { label: 'Hour 2', task: 'Full-Funnel Week-in-Review', detail: 'Aggregating ad performance, organic search growth, and social data into a unified overview.' },
        { label: 'Hour 3', task: 'Cross-Platform Analytics', detail: 'Evaluating multi-channel social growth, impression shares, and engagement rates.' },
        { label: 'Hour 4', task: 'Advanced Reporting Buildout', detail: 'Finalizing custom tracking variables and updating executive reporting dashboards.' },
        { label: 'Hour 5', task: 'Biweekly Strategy Prep (Alt. Weeks)', detail: 'Prepping data models, growth metrics, and slide notes for upcoming strategy sessions.' },
      ],
      flexNote: '35 Mins: Final system diagnostics check before the weekend.',
    },
    {
      day: 'Saturday',
      totalHours: '5.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Weekend SLA Monitoring', detail: 'Executing the 15-minute response SLA check for high-intent weekend traffic and leads.' },
        { label: 'Hour 2', task: 'Paid Ad Maintenance', detail: 'Monitoring weekend ad spend caps, checking for ad fatigue, and pausing underperforming creatives.' },
        { label: 'Hour 3', task: 'Social Community Oversight', detail: 'Managing automated weekend posting schedules and tracking viral or high-traction comments.' },
        { label: 'Hour 4', task: 'Funnel Integrity Checks', detail: 'Running automated diagnostics across e-commerce checkouts, lead forms, and calendar bookings.' },
        { label: 'Hour 5', task: 'Strategic Backlog Review', detail: 'Organizing the strategic growth roadmap and mapping out next week’s testing frameworks.' },
      ],
    },
    {
      day: 'Sunday',
      totalHours: '5.0 Hours',
      blocks: [
        { label: 'Hour 1', task: 'Pre-Week SLA Sweep', detail: 'Sunday evening system diagnostics to ensure all tracking pixels, triggers, and workflows are green.' },
        { label: 'Hour 2', task: 'Campaign & Ad Pre-Checks', detail: 'Setting up and pre-scheduling Sunday-night/Monday-morning ad launches and email blasts.' },
        { label: 'Hour 3', task: 'Organic & SEO Pulse Check', detail: 'Reviewing weekend traffic spikes, search indexing status, and organic channel health.' },
        { label: 'Hour 4', task: 'Data Consolidation', detail: 'Pulling weekend conversion data to feed cleanly into Monday morning’s executive dashboard view.' },
        { label: 'Hour 5', task: 'Weekly Vision Alignment', detail: 'Finalizing priority targets to maximize the upcoming week’s multi-channel marketing impact.' },
      ],
    },
  ],
};