'use strict'

module.exports = {
  'githubAuth': {
      'clientID': process.env.GITHUB_KEY,
      'clientSecret': process.env.GITHUB_SECRET,
      'callbackUrl': process.env.APP_URL + 'auth/github/callback'
  }  
};