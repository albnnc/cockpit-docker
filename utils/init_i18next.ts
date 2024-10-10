import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const knownLanguages: Record<string, string> = {
  "en-us": "en",
  "ru-ru": "ru",
};

export const defaultLanguage = "en";

export function initI18Next() {
  const language = knownLanguages[
    localStorage.getItem("cockpit.lang") || ""
  ] || defaultLanguage;
  i18n
    .use({
      type: "backend",
      read(
        language: string,
        _namespace: string,
        callback: (error: unknown, translations: unknown) => void,
      ) {
        fetch(`./locales/${language}.json`)
          .then((resp) => resp.json())
          .then((resources) => {
            callback(null, resources);
          })
          .catch((error) => {
            callback(error, null);
          });
      },
    })
    .use(initReactI18next)
    .init({
      lng: language,
      defaultNS: "common",
      fallbackLng: false,
      ns: [],
    });
}
