// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DEFAULT_LANGUAGE, LANGUAGES, RTL_CODES } from './languages';
import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import hi from './locales/hi.json';
import es from './locales/es.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import bn from './locales/bn.json';
import pt from './locales/pt.json';
import id from './locales/id.json';
import ur from './locales/ur.json';
import ru from './locales/ru.json';
import de from './locales/de.json';
import ja from './locales/ja.json';
import pcm from './locales/pcm.json';
import arEG from './locales/ar-EG.json';
import mr from './locales/mr.json';
import vi from './locales/vi.json';
import te from './locales/te.json';
import sw from './locales/sw.json';
import ha from './locales/ha.json';
import tr from './locales/tr.json';
import pnb from './locales/pnb.json';
import fil from './locales/fil.json';
import ta from './locales/ta.json';
import yue from './locales/yue.json';
import wuu from './locales/wuu.json';
import fa from './locales/fa.json';
import ko from './locales/ko.json';
import am from './locales/am.json';
import th from './locales/th.json';
import km from './locales/km.json';

const resources = {
  en: { translation: en },
  'zh-CN': { translation: zhCN },
  hi: { translation: hi },
  es: { translation: es },
  ar: { translation: ar },
  fr: { translation: fr },
  bn: { translation: bn },
  pt: { translation: pt },
  id: { translation: id },
  ur: { translation: ur },
  ru: { translation: ru },
  de: { translation: de },
  ja: { translation: ja },
  pcm: { translation: pcm },
  'ar-EG': { translation: arEG },
  mr: { translation: mr },
  vi: { translation: vi },
  te: { translation: te },
  sw: { translation: sw },
  ha: { translation: ha },
  tr: { translation: tr },
  pnb: { translation: pnb },
  fil: { translation: fil },
  ta: { translation: ta },
  yue: { translation: yue },
  wuu: { translation: wuu },
  fa: { translation: fa },
  ko: { translation: ko },
  am: { translation: am },
  th: { translation: th },
  km: { translation: km },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES.map((l) => l.code),
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'jecon_language',
      caches: ['localStorage'],
    },
  });

const applyDocumentDirection = (lng: string) => {
  const base = lng.split('-')[0];
  const isRtl = RTL_CODES.includes(lng) || RTL_CODES.includes(base);
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
};

applyDocumentDirection(i18n.language || DEFAULT_LANGUAGE);
i18n.on('languageChanged', applyDocumentDirection);

export default i18n;