const express = require('express')
const exphbs  = require('express-handlebars')

// Hata mesaji icin onerilen yuklemeler
const Handlebars = require('handlebars')
// const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate

mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(fileUpload())

app.use(express.static('public'))

app.engine('handlebars', exphbs({helpers:{generateDate:generateDate},
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    }
))
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// routes/main e sayfa yonlendirmeleri yapildi
const main = require('./routes/main')
const posts = require('./routes/posts');

// const moment = require('moment');
app.use('/', main)
app.use('/posts', posts)

app.listen(port, hostname, () => {
  console.log(`Example app listening at http://${hostname}:${port}`)
})