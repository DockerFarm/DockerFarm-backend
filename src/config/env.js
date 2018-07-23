
export default (env) => ({
    jwtSecret: env.JWT_SECRET,
    sha256Secret : env.SHA256_SECRET,
    mongoUrl : env.MONGO_URL,
    port: env.PORT
});