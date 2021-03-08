let config;
try {
    config = require('../../config.json');
} catch (error) {
    config = null;
}

exports.config = {
    tokens: {
        discord: config ? config.discord : process.env.DISCORD,
        mongoUri : config ? config.mongoUri : process.env.MONGO_URI,
    },
    prefix: config ? config.prefix : process.env.PREFIX
}