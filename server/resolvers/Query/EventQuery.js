const  Events = require('../../models/events')

module.exports = {
    getEvents:(root,args) => {
        if(args.is_active || args.date) return Events.find(args).populate('created_by').exec();
        if(args.city) return Events.find({'address.city':args.city}).populate('created_by').exec();
        if(args.tag) return Events.find({tags:{$in:[args.tag]}}).populate('created_by').exec();

        return Events.find().populate('created_by').exec();
    },
    getEvent:(root,args) => {
        return Events.findOne({_id:args.id}).populate('created_by').exec();
    }
}  