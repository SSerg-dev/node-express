const { Router } = require('express')
const router = Router()

router.get('/', (request, response) => {
  response.render('index', {
    title: 'Home page',
    isHome: true
  })
})


module.exports = router