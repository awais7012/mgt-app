const db = require('./db')
export const mutation = `#grapghql
extend type Mutation:{
        createTeam(input :createTeamInput):CreateTeamResponse!
    }
`