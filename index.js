
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
