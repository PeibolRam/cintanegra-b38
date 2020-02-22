const UserMutations = require('./UserMutation')
const EventMutation = require('./EventMutation')

module.exports = {
    ...UserMutations,
    ...EventMutation
}