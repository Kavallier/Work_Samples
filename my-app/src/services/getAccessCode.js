async function getAccessToken() {
	const auth = require("@adobe/jwt-auth");
	const _config = require("./getJWTToken.js");
	let options = _config.credentials;
	let auth_response;
	
	try {
		auth_response = await auth(options);
		// console.log(auth_response);
		return auth_response.access_token;
	} catch(err) {
		console.log(err);
	}
}

module.exports.getAccessToken = getAccessToken();