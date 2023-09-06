import polyglotI18nProvider from 'ra-i18n-polyglot';
import {spanishMessages} from './spanishMessages';
// import {englishMessages} from './englishMessages';

export const i18nProvider = polyglotI18nProvider(
    locale => spanishMessages, 'es'
    // translate: key => lodashGet(messages, key),
    // changeLocale: newLocale => {
    //     messages = (newLocale === 'fr') ? frenchMessages : englishMessages;
    //     locale = newLocale;
    //     return Promise.resolve();
    // },
    // getLocale: () => locale
);