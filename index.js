
  /**
   * Replace all key of string
   * @param  {[string]} string [Origin string]
   * @param  {[string]} key    [Key to replace]
   * @param  {[string]} value  [Value to insert]
   * @return {[string]}        [Result]
   * e.g.
   *   replaceAll('%sabcd%s', '%s', '_')
   *   -> '_abcd_'
   */
  function replaceAll (string, key, value) {
    while (~string.indexOf(key)) {
      string = string.replace(key, value)
    }
    return string
  }

  /**
   * Replace i18n transition with dynamic values
   * @param  {[string]} transition [The origin transition]
   * @param  {[string]} key        [Mark where to replace]
   * @param  {[Array]}  args       [Dynamic input values]
   * @return {[string]}            [Result]
   * e.g.
   * 	indexReplace('I am %2. I come from %1.', '%', ['CQ', 'suyu34'])
   * 	-> 'I am suyu34. I come from CQ.'
   */
  function indexReplace (transition, key, args) {
    for (var i = 0, len = args.length; i < len; i++) {
      var argValue = args[i]
      var argReplace = key + (i + 1) + ''
      transition = replaceAll(transition, argReplace, argValue)
    }
    return transition
  }

  /**
   * Replace i18n transition with dynamic values one by one
   * @param  {[string]} transition [The origin transition]
   * @param  {[string]} key        [Mark where to replace]
   * @param  {[Array]} args        [Dynamic input values]
   * @return {[string]}            [Result]
   * e.g.
   * 	zeroReplace('I am %s. I come from %s.', '%', ['suyu34', 'CQ'])
   * 	-> 'I am suyu34. I come from CQ.'
   */
  function zeroReplace (transition, key, args) {
    if (!args && !args.length) return transition

    var replaceKey = key + 's'
    while (~transition.indexOf(replaceKey) && args.length) {
      transition = transition.replace(replaceKey, args.shift())
    }
    return transition
  }

  /**
  * Parse the accept-language to array
  * @param  header: string  The accept-language from browser
  * @return string[]
  * e.g.
  * 	getAcceptedLanguagesFromHeader('zh-CN,zh;q=0.8,en;q=0.6')
  * 	-> ['zh-CN', 'zh', 'en']
   */
  function getAcceptedLanguagesFromHeader (header) {
    var languages = header.split(',')
    var preferences = {}
    return languages.map(function (item) {
      var preferenceParts = item.trim().split(';q=')
      if (preferenceParts.length < 2) {
        preferenceParts[1] = 1
      } else {
        var quality = +preferenceParts[1]
        preferenceParts[1] = quality || 0
      }
      preferences[preferenceParts[0]] = preferenceParts[1]

      return preferenceParts[0]
    }).filter(function (lang) {
      return preferences[lang] > 0
    }).sort(function (a, b) {
      return preferences[b] - preferences[a]
    })
  }

  module.exports = {
    language: 'en',
    defaultLanguage: 'en',
    replaceKey: '%',
    emptyKey: '&empty;',
    localesSet: {},

    setReplace: function (key) {
      this.replaceKey = key
      return this
    },
    setEmptyKey: function (key) {
      this.emptyKey = key
    },
    setDefaultLanguage: function (defaultLanguage) {
      this.defaultLanguage = defaultLanguage
    },

    guessLanguage: function (accepts, languages, fallMap) {
      if (!fallMap) fallMap = {}
      var acceptedLanguages = getAcceptedLanguagesFromHeader(accepts)

      for (var i = 0, len = acceptedLanguages.length; i < len; i++) {
        var lang = acceptedLanguages[i]
        var lr = lang.split('-', 2)
        var parentLang = lr[0]
        var fallLang = fallMap[lang]

        if (~languages.indexOf(lang)) return lang
        if (~languages.indexOf(fallLang)) return fallLang
        if (~languages.indexOf(parentLang)) return parentLang
      }

      return this.defaultLanguage
    },
    getLanguage: function () {
      return this.language
    },
    setLanguage: function (language) {
      this.language = language
      return this
    },
    getLocales: function (language) {
      if (language) {
        return this.localesSet[language] || {}
      } else {
        return this.localesSet[this.language] || {}
      }
    },
    setLocales: function (language, locales) {
      var currentLocales = this.localesSet[language]
      if (!currentLocales) {
        currentLocales = this.localesSet[language] = {}
      }

      var keys = Object.keys(locales)
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i]
        var value = locales[key]
        currentLocales[key] = value
      }
      return this
    },

    get: function (key) {
      var args = []
      var len = arguments.length
      if (len > 1) {
        for (var i = 1; i < len; i++) {
          args.push(arguments[i])
        }
      }
      return this.privateGet(key, this.language, args)
    },
    point: function (key, language) {
      var args = []
      var len = arguments.length
      if (len > 2) {
        for (var i = 2; i < len; i++) {
          args.push(arguments[i])
        }
      }
      return this.privateGet(key, language, args)
    },

    // private functions
    privateGet: function (key, language, args) {
      var locales = this.getLocales(language)
      var defaultLocales = this.getLocales(this.defaultLanguage)
      var value = locales[key] || defaultLocales[key] || key
      if (args.length) {
        value = this.privateTranslate(value, key, args)
      }
      value = replaceAll(value, this.emptyKey, '')
      return value
    },
    privateTranslate: function (value, key, args) {
      if (value) {
        value = indexReplace(value, this.replaceKey, args)
        value = zeroReplace(value, this.replaceKey, args)
        return value
      } else {
        return key
      }
    }
  }
