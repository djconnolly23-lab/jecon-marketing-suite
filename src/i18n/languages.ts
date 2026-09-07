export interface LanguageOption {
  code: string;
  name: string;
  nativeName?: string;
}

/** All supported languages from product requirements. */
export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'zh-CN', name: 'Mandarin Chinese', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'ar', name: 'Modern Standard Arabic', nativeName: 'العربية' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'de', name: 'Standard German', nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'pcm', name: 'Nigerian Pidgin' },
  { code: 'ar-EG', name: 'Egyptian Arabic', nativeName: 'مصرى' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'pnb', name: 'Western Punjabi', nativeName: 'پنجابی' },
  { code: 'fil', name: 'Tagalog (Filipino)', nativeName: 'Tagalog' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'yue', name: 'Yue Chinese (Cantonese)', nativeName: '粵語' },
  { code: 'wuu', name: 'Wu Chinese', nativeName: '吴语' },
  { code: 'fa', name: 'Iranian Persian', nativeName: 'فارسی' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ' },
];

export const DEFAULT_LANGUAGE = 'en';

export const RTL_CODES = ['ar', 'ar-EG', 'ur', 'fa', 'pnb'];

export function getLanguageByCode(code: string): LanguageOption {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}