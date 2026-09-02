import { Platform, MediaType } from './index';

export interface SupplierCampaign {
  id: string;
  supplierName: string;
  supplierLogo?: string;
  supplierCategory: string;
  campaignTitle: string;
  tagline: string;
  recommendedPlatform: Platform;
  recommendedMediaType: MediaType;
  aspectRatio: '9:16' | '1:1' | '4:5' | '16:9';
  hookTemplate: string;
  bodyTemplate: string;
  ctaTemplate: string;
  defaultHashtags: string[];
  complianceNotes: string;
  keyBenefits: string[];
  estimatedReachMultiplier: number;
}
