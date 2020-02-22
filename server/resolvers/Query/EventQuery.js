const  Events = require('../../models/events')

module.exports = {
    getEvents:(root,args) => {
        if(args.is_active || args.date) return Events.find(args).exec();
        if(args.city) return Events.find({'address.city':args.city}).exec();
        if(args.tag) return Events.find({tags:{$in:[args.tag]}}).exec();

        return Events.find().exec();
    },
    getEvent:(root,args) => {
        return Events.findOne({_id:args.id}).exec();
    }
}  