const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');


const app = express();
app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(`
            type RootQuery {
                events: [String]!
            }

            type RootMutation {
                createEvent(name: String): String
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            events:() => {
                return ['Data1', 'Data2', 'Data3', 'Data4'];
            },
            createEvent: (args) => {
                const eventName = args.name;
                return eventName;
            }
        },
        graphiql: true
    })
);

app.listen(4000, () => {
        console.log('Your local port run on http://localhost:4000')
})