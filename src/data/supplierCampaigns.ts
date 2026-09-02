import { SupplierCampaign } from '../types/supplier';
import { CampaignSettings, PostDraft } from '../types';

export const MASTER_SUPPLIER_CAMPAIGNS: SupplierCampaign[] = [
  {
    id: 'supplier-camp-001',
    supplierName: 'Apex Cloud Systems',
    supplierCategory: 'Cloud Infrastructure & Edge Computing',
    campaignTitle: 'Zero-Latency Hybrid Cloud Deployment',
    tagline: 'Tier-1 Enterprise Cloud & Edge Acceleration',
    recommendedPlatform: 'instagram',
    recommendedMediaType: 'reel',
    aspectRatio: '9:16',
    hookTemplate: 'Why legacy server infrastructure is silently draining 35% of your annual tech budget.',
    bodyTemplate: `Modern enterprise scale demands sub-10ms response times.\n\nBy co-locating compute at the edge with automated multi-region failover, engineering teams achieve:\n- 60% reduction in API response latency\n- 99.999% high-availability SLA guarantee\n- 40% reduction in egress transfer costs\n\nCertified and deployed in partnership with JECON LLC.`,
    ctaTemplate: 'Comment "APEX" or visit jecon.io/apex-cloud for your tailored executive architecture roadmap.',
    defaultHashtags: ['#CloudComputing', '#EdgeInfrastructure', '#DevOps', '#EnterpriseTech', '#JECON'],
    complianceNotes: 'Co-branded Tier-1 supplier partnership. Always tag #partner and disclose SLA parameters.',
    keyBenefits: [
      '60% reduction in API response latency',
      'Automated multi-region failover clusters',
      'Turnkey enterprise compliance & ISO 27001'
    ],
    estimatedReachMultiplier: 1.45
  },
  {
    id: 'supplier-camp-002',
    supplierName: 'Vanguard Robotics & Automation',
    supplierCategory: 'Smart Factory & Industrial IoT',
    campaignTitle: 'Smart Factory & Industrial Automation Playbook',
    tagline: 'Next-Gen Machine Vision & Predictive Maintenance',
    recommendedPlatform: 'linkedin',
    recommendedMediaType: 'carousel',
    aspectRatio: '1:1',
    hookTemplate: 'How tier-1 manufacturers reduced assembly line cycle time from 14 minutes to 90 seconds.',
    bodyTemplate: `Predictive maintenance and machine vision are no longer experimental—they are competitive survival.\n\nInside our 5-slide executive breakdown:\n1. Sensor telemetry integration across legacy lines\n2. Real-time defect detection with 99.8% precision\n3. ROI realized within 4.2 months of deployment\n\nCo-developed with JECON manufacturing advisors.`,
    ctaTemplate: 'Download the complete 5-slide Smart Factory Playbook via the link in the comments.',
    defaultHashtags: ['#IndustrialAutomation', '#SmartFactory', '#Robotics', '#Manufacturing', '#Operations'],
    complianceNotes: 'Supplier case study co-brand. Include explicit hardware compatibility footnote.',
    keyBenefits: [
      '99.8% computer vision QA accuracy',
      'Sub-5 month payback milestone',
      'Plug-and-play IoT sensor retrofitting'
    ],
    estimatedReachMultiplier: 1.3
  },
  {
    id: 'supplier-camp-003',
    supplierName: 'Quantum Edge Cyber Defense',
    supplierCategory: 'Cybersecurity & Zero-Trust Governance',
    campaignTitle: 'Enterprise Zero-Trust Security Architecture',
    tagline: 'Continuous Identity Verification & Perimeter Isolation',
    recommendedPlatform: 'linkedin',
    recommendedMediaType: 'text_article',
    aspectRatio: '1:1',
    hookTemplate: '92% of enterprise breaches bypass perimeter firewalls. Here is how zero-trust stops lateral spread.',
    bodyTemplate: `Perimeter-only security models are fundamentally obsolete in distributed workforces.\n\nThe modern Zero-Trust standard:\n- Continuous cryptographic identity attestation\n- Micro-segmented network zoning\n- Automated anomalous credential revocation in <300ms\n\nProtect your enterprise data assets with JECON and Quantum Edge.`,
    ctaTemplate: 'Schedule a confidential Zero-Trust vulnerability audit with our joint security desk.',
    defaultHashtags: ['#Cybersecurity', '#ZeroTrust', '#InfoSec', '#CISO', '#EnterpriseRisk'],
    complianceNotes: 'Subject to FTC and SEC cybersecurity disclosure standards.',
    keyBenefits: [
      'Micro-segmented perimeter defense',
      'Automated session revocation (<300ms)',
      'Full compliance audit trails (SOC2 / HIPAA)'
    ],
    estimatedReachMultiplier: 1.25
  }
];

/**
 * Personalizes a Master Supplier Campaign using current active BrandCampaignConfig
 */
export function personalizeSupplierCampaign(
  campaign: SupplierCampaign,
  settings: CampaignSettings
): PostDraft {
  const brandName = settings.brandName || 'JECON LLC';
  const campaignName = settings.activeCampaign || 'Q3 Executive Growth';

  // Customize body copy with active brand and campaign settings
  let personalizedBody = campaign.bodyTemplate
    .replace(/JECON LLC/g, brandName)
    .replace(/JECON/g, brandName);

  let personalizedHook = campaign.hookTemplate;
  let personalizedCta = campaign.ctaTemplate.replace(/JECON/g, brandName);

  // Blend in brand-specific hashtags
  const hashtags = Array.from(
    new Set([
      ...campaign.defaultHashtags,
      `#${brandName.replace(/\s+/g, '')}`,
      '#B2BMarketing',
      '#Leadership'
    ])
  );

  return {
    id: `post-supp-${Date.now()}`,
    platform: campaign.recommendedPlatform,
    title: `${campaign.supplierName}: ${campaign.campaignTitle}`,
    mediaType: campaign.recommendedMediaType,
    hook: personalizedHook,
    bodyCopy: personalizedBody,
    callToAction: personalizedCta,
    hashtags,
    visualPromptSuggestion: `High-contrast commercial enterprise graphic for ${campaign.supplierName} featuring ${campaign.campaignTitle} with ${brandName} co-branding badges.`,
    aspectRatio: campaign.aspectRatio,
    status: 'draft',
    scheduledTime: new Date(Date.now() + 86400000 * 2).toISOString(),
    ftcDisclosures: {
      hasSponsoredContent: true,
      hasProperTags: true,
      complianceNotes: `Supplier co-branded campaign for ${campaign.supplierName}. ${campaign.complianceNotes} Filtered for ${settings.ftcComplianceRules}`
    },
    createdAt: new Date().toISOString()
  };
}
