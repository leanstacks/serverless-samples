const jwt = require('jsonwebtoken');

const AUDIENCE = process.env.AUDIENCE;
const ISSUER = process.env.ISSUER;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

exports.generate = (apiKey) => {

  console.log('Token::generate');

  const payload = {
    apiKey
  };

  const subject = apiKey

  const signOptions = {
    issuer: ISSUER,
    subject,
    audience: AUDIENCE,
    expiresIn: '60m',
    algorithm: 'RS256'
  };

  return jwt.sign(payload, PRIVATE_KEY, signOptions);

};

exports.verify = (token) => {

  console.log('Token::verify');

  const verifyOptions = {
    audience: AUDIENCE,
    issuer: ISSUER,
    maxAge: '60m',
    algorithm: ['RS256']
  };

  return jwt.verify(token, PUBLIC_KEY, verifyOptions);

};
