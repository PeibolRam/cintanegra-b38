const Users = require('../../models/user')

module.exports = {
    createUser:(root,args) => {
        return Users.create(args.data)
    }
}