const path = require('path')
const fs = require('fs')

// const _path = path.join(
//   process.mainModule.filename,
//   'data',
//   'card.json'
// )

class Card {
  static async add(course) {
    const card = await Card.fetch()

    const index = card.courses.findIndex((c) => c.id === course.id)
    const candidate = card.courses[index]

    if (candidate) {
      // update count course
      candidate.count++
      card.courses[index] = candidate
    } else {
      // add new course
      course.count = 1
      card.courses.push(course)
    }

    card.price += +course.price

    const _path = path.join(__dirname, '..', 'data', 'card.json')

    // console.log('$$ card', card, _path)

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        // _path
        JSON.stringify(card, null, 2),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static async remove(id) {
    const card = await Card.fetch()

    const index = card.courses.findIndex((c) => c.id === id)
    const course = card.courses[index]

    if (course.count === 1) {
      // remove course
      card.courses = card.courses.filter((c) => c.id !== id)
    } else {
      // change amount
      card.courses[index].count--
    }
    // change price
    card.price -= course.price

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        // _path
        JSON.stringify(card, null, 2),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve(card)
          }
        }
      )
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'card.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }
}

module.exports = Card
