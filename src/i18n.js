const i18n = require('i18n');
i18n.configure({
    locales:['en'],
    directory: __dirname + '/locales'
});

module.exports.__ = i18n.__;
