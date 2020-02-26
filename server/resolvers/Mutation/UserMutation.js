const Users = require('../../models/user')
const storage = require('../../utils/storage')

module.exports = {
    createUser:async(root,args) => {
        if(args.data.photo){
            const { createReadStream } = await args.data.photo;
            const stream = createReadStream();
            const image = await storage({ stream })

            args.data = {...args.data, photo:image.url}
        }
        return Users.create(args.data)
    },

    updateUser:(root,args) => {
        return Users.findByIdAndUpdate(args.id,{$set:{...args.data}},{new:true})
    },

    deleteUser:(root,args) => {
        return Users.findByIdAndUpdate(args.id, {$set:{is_active:false}},{new:true})
    }
}