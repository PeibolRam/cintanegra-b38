const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    birth_date:{
        type:Date,
    },
    gender:{
        type: String,
        enum:['M','F','O']
    },
    photo:{
        type:String
    },
    events_create:{
        type:[Schema.Types.ObjectId],
        ref:'events'
    },
    events_assists:{
        type:[Schema.Types.ObjectId],
        ref:'events'
    },
    is_active:{
        type:Boolean,
        default:true
    }
},{timestamps:true});

module.exports = mongoose.model('users', UserSchema)