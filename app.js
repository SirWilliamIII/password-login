const express = require('express'),
	hbs = require('hbs'),
	_ = require('lodash'),
	bodyParser = require('body-parser')

const {
	mongoose
} = require('./db/mongoose')
const {
	User
} = require('./models/User')

const app = express()
const port = 3333

app.use(bodyParser.json())

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/views'))

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})

app.get('/', (req, res) => {
	res.render('home', {
		title: 'Homepage',
		dog: {
			name: 'Spot',
			url: 'http://res.cloudinary.com/demo/video/upload/so_8.5/dog.jpg'
		}
	})
})

app.get('/login', (req, res) => {
	res.render('login')
})

app.post('/login', (req, res) => {
	const user = new User(req.body)
	user.save()
		.then(user => {
			return user.generateToken()
		})
		.then(token => {
			res.header('x-auth', token).send(user)
		})
		.catch(e => {
			res.status(404).send(e)
		})
})

app.get('/verified', (req, res) => {
	const token = req.header('x-auth')

	User.findByToken(token)
		.then(user => {
			if (!user) {
				return Promise.reject()
			}
			res.send(user)
		})
		.catch(e => {
			res.status(404).send()
		})
})

app.listen(port, () => {
	console.log(`Listening on port ${ port }`)
})