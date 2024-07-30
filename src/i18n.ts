import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Загружает переводы с сервера
  .use(LanguageDetector) // Определяет язык пользователя
  .use(initReactI18next) // Интегрирует i18n с React
  .init({
    fallbackLng: 'en', // Язык по умолчанию, если текущий язык недоступен
    lng: 'en', // Язык по умолчанию
    interpolation: {
      escapeValue: false, // Отключает экранирование символов
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'], // Порядок обнаружения языка
      caches: ['localStorage', 'cookie'], // Куда кэшировать язык
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Путь к файлам переводов
    },
  });

export default i18n;
