const dotenv = require('dotenv');
dotenv.config({ path: '/.env' });

module.exports = {
    PORT: process.env.PORT,
    DB: {
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_DATABSE: process.env.DB_DATABASE,
    },
    SS: {
        
    }
}