const Users = require('../models/user');
const bcrypt = require('bcrypt');
const createToken = require('./createToken');


module.exports = (email, password) => {

	return new Promise((resolve,reject) => {

		Users.findOne({email}).then((user) => {
			if(!user) throw new Error('User not found');

			bcrypt.compare(password,user.password,(err,isValid) => {
				isValid ? resolve(createToken(user)) : reject(new Error('Password not match'));
			});

		});

	});
};