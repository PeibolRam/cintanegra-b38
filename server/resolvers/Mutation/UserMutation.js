const Users = require('../../models/user')

module.exports = {
    createUser:(root,args) => {
        return Users.create(args.data)
    },

    updateUser:(root,args) => {
        return Users.findByIdAndUpdate(args.id,{$set:{...args.data}},{new:true})
    },

    deleteUser:(root,args) => {
        return Users.findByIdAndUpdate(args.id, {$set:{is_active:false}},{new:true})
    }
}