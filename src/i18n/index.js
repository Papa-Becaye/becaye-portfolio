import i18next from "i18next";
import fr from "@/locales/fr/translation.json";
import en from "@/locales/en/translation.json";
import ar from "@/locales/ar/translation.json";
import { defaultLanguage, isValidLanguage } from "./languages";

const resources = {
  fr: { translation: fr },
  en: { translation: en },
  ar: { translation: ar },
};

const instances = {};

/**
 * Retourne une instance i18next initialisée de façon synchrone pour une langue.
 * Une instance par langue : sûr pour le rendu serveur (pas d'état partagé entre
 * requêtes) et changement de langue instantané côté client.
 */
export function getI18n(lang) {
  const code = isValidLanguage(lang) ? lang : defaultLanguage;
  if (!instances[code]) {
    const instance = i18next.createInstance();
    instance.init({
      lng: code,
      fallbackLng: defaultLanguage,
      resources,
      initAsync: false,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });
    instances[code] = instance;
  }
  return instances[code];
}

export { resources };
