const UserQueries = require('./UserQuery')
const EventsQueries = require('./EventQuery')
module.exports = {
    ...UserQueries,
    ...EventsQueries
}

