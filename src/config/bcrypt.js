module.exports = {
    saltRounds: process.env.BCRYPT_SALTROUNDS || 5,
    secret: process.env.BCRYPT_SECRET || 'somesecret'
}