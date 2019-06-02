// NPM packages
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const {buildSchema} = require('graphql')
const mongoose = require('mongoose')

const Event = require('./models/events')

// express app
const app = express()

// env variables
const {
	PORT,
	HOST,
	USERNAME,
	PASSWORD,
	CLUSTER,
	DB_NAME
} = process.env

// Will remove onc we have set up the database
const events = []

// parse json data
app.use(bodyParser.json())

// set up database connection
mongoose.connect(
	`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`,
	{useNewUrlParser: true}
).then(() => {
	console.log(`Connected to Database ${DB_NAME}`)
}).catch((err) => {
	console.log('Error: ', err)
})

// graphql endpoint
app.use('/graphql', graphqlHTTP({
	schema: buildSchema(`
		input EventInput {
			title: String!
			description: String!
			price: Float!
			date: String!
		}

		type Event {
			_id: ID!
			title: String!
			description: String!
			price: Float!
			date: String!
		}

		type RootQuery {
			events: [Event!]!
		}

		type RootMutation {
			createEvents(eventInput: EventInput): Event
		}

		schema {
			query: RootQuery
			mutation: RootMutation
		}
	`),
	rootValue: {
		events: () => {
			return Event
        .find()
        .then((events) => {
          return events.map((event) => {
            const {_doc} = event

            return {..._doc, _id: event.id}
          })
        }).catch((err) => {
          throw err
        })
		},
		createEvents: (args) => {
			const {
				title,
				description,
				price,
				date
			} = args.eventInput

      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date)
      })

      return event
        .save()
        .then((result) => {
          const {_doc} = result

          return {..._doc, _id: result.id}
        }).catch((err) => {
          throw err
        })
		}
	},
	graphiql: true
}))

// listineng server
app.listen(PORT, () => {
	console.log(`Server running at http://${HOST}:${PORT}`)
})

