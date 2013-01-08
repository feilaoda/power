cite class: 'copyright', ->
  span '&copy;'
  a href: "mailto:#{t('email')}", -> t('author')
  span "#{t('year')}."
  span 'Powered by <a href="https://github.com/feilaoda/power">Power</a>'
