import * as config from './handler-set-config';
const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'zh'],
  directory: path.join(__dirname, '/locales'),
  register: global,
});

const locale = config.getConfig('locale');
if (locale) {
  i18n.setLocale(locale);
} else {
  i18n.setLocale('en');
}

export default i18n;
