const jwt = require('jsonwebtoken');

module.exports = (user) => {

	const payload = {
		id:user._id,
		email:user.email,
		first_name:user.first_name
	};
    
	return jwt.sign(payload,process.env.SECRET,{expiresIn:'1d'});
};