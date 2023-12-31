const { Router, request, response } = require('express')
const Card = require('../models/card')
const Course = require('../models/course')

const router = Router()

router.post('/add', async (request, response) => {
  const course = await Course.getById(request.body.id)
  await Card.add(course)
  response.redirect('/card')
})

router.delete('/remove/:id', async (request, response) => {
   const card = await Card.remove(request.params.id)
   response.status(200).json(card) 

})

router.get('/', async (request, response) => {
  const card = await Card.fetch()
  response.render('card', {
    title: 'Card',
    isCard: true,
    courses: card.courses,
    price: card.price,
  })
})

module.exports = router
