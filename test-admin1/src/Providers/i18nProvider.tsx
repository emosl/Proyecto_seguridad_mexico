//imports from react-admin,jest and react
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { spanishMessages } from '../spanishMessages';

//export i18nProvider for the admin page
export const i18nProvider = polyglotI18nProvider(
    (locale: string) => spanishMessages, 'es'
);
