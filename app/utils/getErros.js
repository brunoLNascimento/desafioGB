const errors = {
    'internal-server-error': {
      code: 500,
      message: 'internal-server-error'
    },
    'user-or-password-incorrect': {
      code: 401,
      message: 'user-or-password-incorrect'
    }
  }

module.exports = {
    
    getError (error) {
      return errors[error.message] ? errors[error.message] : errors['internal-server-error'];
    }
    

}