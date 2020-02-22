const Users = require('../../models/user')

module.exports = {
    getUsers:(root,args,context,info) => {
        return Users.find(args).exec()
    },

    getUser:(root,args) =>{
        if(args.id) return Users.findById(args.id).exec()
        if(args.email) return Users.findOne({email:args.email}).exec()
        if(args.email && args.id) return Users.findOne({email:args.email, _id:args.id}).exec()
        return new Error('You must pass a parameter')
    } 

}