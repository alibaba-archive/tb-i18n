
require('should')
var i18n = require('./index')
var describe = global.describe
var it = global.it

var localesEN = {
  'key1': 'It is normal value.',
  'key2': 'I am &0.',
  'key3': 'I am &1 and come from &2.',
  'key4': 'I am &0 and come from &0.'
}
var localesZH = {
  'key1': '这是一个普通值。',
  'key2': '我是&0。',
  'key3': '我是&1，来自&2。',
  'key4': '我是&0，来自&0。'
}

i18n.setLocales('en', localesEN)
i18n.setLocales('zh', localesZH)

describe('test tb-i18n', function () {
  it('get normal key', function () {
    i18n.get('key1').should.eql(localesEN['key1'])
    i18n.point('key1', 'zh').should.eql(localesZH['key1'])
  })

  it('get dynamic key', function () {
    i18n.get('key2', 'suyu34').should.eql('I am suyu34.')
    i18n.point('key2', 'zh', 'suyu34').should.eql('我是suyu34。')
  })

  it('order arguments', function () {
    i18n.get('key3', 'suyu34', 'CQ').should.eql('I am suyu34 and come from CQ.')
    i18n.point('key3', 'zh', 'suyu34', 'CQ').should.eql('我是suyu34，来自CQ。')
  })

  it('zero arguments', function () {
    i18n.get('key4', 'suyu34', 'CQ').should.eql('I am suyu34 and come from CQ.')
    i18n.point('key4', 'zh', 'suyu34', 'CQ').should.eql('我是suyu34，来自CQ。')
  })

  it('getLanguage', function () {
    i18n.getLanguage().should.eql('en')
  })

  it('setLanguage', function () {
    i18n.setLanguage('zh')
    i18n.getLanguage().should.eql('zh')

    i18n.setLanguage('en') // 还原
  })

  it('getLocales', function () {
    i18n.getLocales('en').should.eql(localesEN)
    i18n.getLocales('zh').should.eql(localesZH)
  })
})
