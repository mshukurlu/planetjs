const databaseConfig = {
    "host":process.env.DATABASE_HOST,
    "database":process.env.DATABASE_NAME,
    "username":process.env.DATABASE_USERNAME,
    "password":process.env.DATABASE_PASSWORD
}

module.exports = databaseConfig;