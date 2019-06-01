const express = require('express')
const bodyParser = require('body-parser')
const graphqlHTTP = require('express-graphql')
const {buildSchema} = require('graphql')

const app = express()
const PORT = 8080
const HOST = 'localhost'

// Will remove onc we have set up the database
const events = []

app.use(bodyParser.json())

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
			return events
		},
		createEvents: (args) => {
			const {
				title,
				description,
				price,
				date
			} = args.eventInput
			const event = {
				_id: Math.random().toString(),
				title,
				description,
				price: +price,
				date
			}
			events.push(event)
			return event
		}
	},
	graphiql: true
}))

app.listen(PORT, () => {
	console.log(`Server running at http://${HOST}:${PORT}`)
})
