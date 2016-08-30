# tb-i18n
[![NPMversion](https://img.shields.io/npm/v/tb-i18n.svg?style=flat-square)](https://www.npmjs.com/package/tb-i18n)
A library to translate i18n key and value.

## Usage
`npm install tb-i18n --save-dev`

## API
### i18n.getLanguage()
To get the current language of i18n.
The Default language of i18n is 'en'.
```
let lang = i18n.getLanguage()
console.log(lang)
```
The result of log is 'en'.


### i18n.setLanguage(language)
To change language of i18n.
```
i18n.setLanguage('zh')
```


### i18n.getLocales(language)
To get the locales of specified language
```
let locales = i18n.getLocales('zh')
```


### i18n.setLocales(language, locales)
To extend i18n locales of specified language
```
i18n.setLocales('en', {
  'key1': 'My name is suyu34.',
  'key2': 'I come from %s.'
})
let value = i18n.get('key1')
```
The result of value is 'My name is suyu34.'. So it is how i18n works.


### i18n.get(key, args...)
To get default value of any key.
```
i18n.setLocales('en', {
  'key1': 'My name is suyu34.',
  'key2': 'I come from %s.',
  'key3': 'My name is %1 and come from %2.',
  'key4': 'My name is %s and come from %s.',
})

// transition: My name is suyu34.
// result:     My name is suyu34.
let value1 = i18n.get('key1')

// transition: I come from %s.
// result:     I come from CQ.
let value2 = i18n.get('key2', 'CQ')

// transition: My name is %1 and come from %2.
// result:     My name is suyu34 and come from CQ.
let value3 = i18n.get('key3', 'suyu34', 'CQ')

// transition: My name is %s and come from %s.
// result:     My name is suyu34 and come from CQ.
let value4 = i18n.get('key4', 'suyu34', 'CQ')
```
The values of key1, key2 and key3 are dynamic. They must have input values when get.So there has two ways to replace value:
- Index Replace: Mark %1, %2... in transition and i18n will replace it by fixed order. It not care about the order of values, but index of values. The example of index replace is 'key3'.
- Zero Replace: Mark %s, %s... in transition and i18n will replace by input values one by one. The order of values will influences the result. The example of zero replace is 'key4'.


### i18n.point(key, language, args...)
To get transition of specified language. Like i18n.get but it accept a specified language.
```
i18n.setLocales('zh', {
  'key1': '我是suyu34。',
  'key2': '我来自%s。',
  'key3': '我是%1，来自%2。',
  'key4': '我是%s，来自%s。',
})

// transition: 我是suyu34。
// result:     我是suyu34。
let value1 = i18n.point('key1', 'zh')

// transition: 我来自%s。
// result:     我来自CQ。
let value2 = i18n.point('key2', 'zh', 'CQ')

// transition: 我是%1，来自%2。
// result:     我是suyu34，来自CQ。
let value3 = i18n.get('key3', 'zh', 'suyu34', 'CQ')

// transition: 我是%s，来自%s。
// result:     我是suyu34，来自CQ。
let value4 = i18n.get('key4', 'zh', 'suyu34', 'CQ')
```

## License
MIT
