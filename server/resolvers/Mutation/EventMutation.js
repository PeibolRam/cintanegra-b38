const Events = require('../../models/events')

module.exports = {
    createEvent:(root,args) => {
        return Events.create(args.data)
    },

    updateEvent:(root,args) => {
        let updateEvent = {}
        Object.keys(args.data).forEach( key => {
            if(key == 'address'){
                Object.keys(args.data[key]).forEach( addressKey => {
                    updateEvent = { ...updateEvent,[`${key}.${addressKey}`]: args.data[key][addressKey] }
                })
            }
            updateEvent= {...updateEvent, [key]:args.data[key]}
        })
        return Events.findByIdAndUpdate(args.id,{$set:updateEvent},{new:true}).exec()
    },

    deleteUser:(root,args) => {
        return Events.findByIdAndUpdate(args.id, {$set:{is_active:false}},{new:true})
    }
}