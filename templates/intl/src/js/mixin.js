import locale from './locale'

export default {
  computed: {
    locale() {
      const result = {}
      const languages = {
        zh_cn: 0,
        zh_hk: 1,
        en_us: 2
      }

      for (let key in locale) {
        result[key] = locale[key][languages[localStorage.lang]]
      }
      return result
    }
  }
}
