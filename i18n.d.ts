/**
 * get the international value of default language
 *
 * ### Locales
 *
 * ```
 * {
 *  en: {
 *    "my.country": "China",
 *    "my.description": "My name is %1, I am %2 years old.",
 *    "my.address": "I am from %s, %s"
 *  }
 * }
 * ```
 *
 * ### Example
 *
 * ``` javascript
 * import * as i18n from 'tb-i18n'
 * const country = i18n.get('my.country')
 * const description = i18n.get('my.description', 'Lee', 12)
 * const address = i18n.get('my.address', 'ChongQing', 'Qijiang')
 * ```
 *
 */
export function get (key: string, ...args: (string | number)[]): string


/**
 * get the international value of specific language
 *
 * ### Locales
 *
 * ```
 * {
 *  en: {
 *    "my.country": "China",
 *    "my.description": "My name is %1, I am %2 years old.",
 *    "my.address": "I am from %s, %s"
 *  }
 * }
 * ```
 *
 * ### Example
 *
 * ``` javascript
 * import * as i18n from 'tb-i18n'
 * const country = i18n.point('my.country', 'en')
 * const description = i18n.point('my.description', 'en', 'Lee', 12)
 * const address = i18n.point('my.address', 'en', 'ChongQing', 'Qijiang')
 * ```
 *
 */
export function point (key: string, language: string, ...args: (string | number)[]): string

/**
 * Set the replace-key to replace dynamic values.
 * The default replace-key is '%'.
 *
 * ### Locales
 *
 * ```
 * {
 *  en: {
 *    "my.country": "China",
 *    "my.description": "My name is &1, I am &2 years old.",
 *    "my.address": "I am from &s, &s"
 *  }
 * }
 * ```
 *
 * ### Example
 *
 * ``` javascript
 * import * as i18n from 'tb-i18n'
 * i18n.setReplace('&')
 * ```
 */
export function setReplace (key: string): void

/**
 * Set the empty-key to replace empty value.
 * The default empty-key is '&empty;'
 *
 * ### Locales
 *
 * ```
 * {
 *  en: {
 *    "value.empty": "It is &soempty;"
 *  }
 * }
 * ```
 *
 * ### Example
 *
 * ``` javascript
 * import * as i18n from 'tb-i18n'
 * i18n.setEmptyKey('&soempty;')
 * ```
 */
export function setEmptyKey (key: string): void

/**
 * Set default-language of tb-i18n.
 * It is used in the get method.
 * The default default-language is 'en'.
 */
export function setDefaultLanguage (language: string): void

/**
 * A help method to guess the language of brower.
 *
 * ### Example
 *
 * ``` javascript
 * import * as i18n from 'tb-i18n'
 * let languages = []
 *
 * languages = ['zh', 'zh-CN']
 * i18n.guessLanguage('zh-CN,zh;q=0.8,en;q=0.6', languages) // 'zh-CN'
 *
 * languages = ['zh', 'zh-CN']
 * i18n.guessLanguage('zh-CN,zh;q=1.8,en;q=0.6', languages) // zh
 *
 * languages = ['zh', 'zh_CN']
 * const switchMap = {}
 * switchMap['zh-CN'] = 'zh_CN'
 * i18n.guessLanguage('zh-CN,zh;q=0.8,en;q=0.6', languages, switchMap) // 'zh_CN'
 * ```
 */
export function guessLanguage (accepts: string, languages: string[], fallMap?: { [key: string]: string }): string

/**
 * Get current language of tb-i18n.
 */
export function getLanguage (): string

/**
 * Set current language of tb-i18n.
 *
 * ### Example
 *
 * ``` javascript
 * import * as i18n from 'tb-i18n'
 * i18n.setLanguage('zh')
 * ```
 *
 */
export function setLanguage (language: string): string

/**
 * Get locales of specific language.
 */
export function getLocales (language: string): { [key: string]: string }

/**
 * Set locales of specific language
 *
 * ### Example
 *
 * ``` javascript
 * import * as i18n from 'tb-i18n'
 * i18n.setLocales('en', {
 *   'key': 'It is key.'
 * })
 * ```
 */
export function setLocales (language: string, locales: { [key: string]: string }): void
