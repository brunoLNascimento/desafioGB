const errors = {
	'token-incorrect': {
		code: 401,
		message: 'token-incorrect'
	},
	'internal-server-error': {
		code: 500,
		message: 'internal-server-error'
	},
	'user-or-password-incorrect': {
		code: 401,
		message: 'user-or-password-incorrect'
	},
	'token is required': {
		code: 401,
		message: 'token is required'
	}
	
}

module.exports = {
	getError (error) {
		return errors[error.message] ? errors[error.message] : errors['internal-server-error'];
	}
}