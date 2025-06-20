const db = require('./db')
export const mutation = `#grapghql
extend type Mutation {
    createTask(input: CreateTaskInput!): CreateTaskResponse!
}
`