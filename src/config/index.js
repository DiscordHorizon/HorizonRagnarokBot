let config;
try {
    config = require('../../config.json');
} catch (error) {
    config = null;
}

exports.config = {
    tokens: {
        discord: config ? config.discord : process.env.DISCORD,
    }
}