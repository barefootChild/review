import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const vuei18n = new VueI18n({
  locale: 'zh',
  messages: {
    zh: require('./zh'),
    en: require('./en')
  }
})

export default vuei18n