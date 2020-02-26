const jwt = require('jsonwebtoken');
const Users = require('../models/user');


module.exports = async(request) => {

	const Authorization = request.get('Authorization');
	if(Authorization){
		const formatedToken = Authorization.replace('JWT ','');
		const payload =jwt.verify(formatedToken,process.env.SECRET);
		if(!payload) throw new Error('Token is invalid');
		const user = await Users.findOne({email:payload.email});
		if(!user) throw new Error('User does not exist');
		return {...request, user};
	}else{
		return request;
	}


};