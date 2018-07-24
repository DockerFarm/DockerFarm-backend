
export default (env) => ({
    jwtSecret: env.JWT_SECRET,
    sha256Secret : env.SHA256_SECRET,
    mongoUrl : env.MONGO_URL,
    port: env.PORT,
    github : {
        clientId : env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        callbackUrl : env.GITHUB_CALLBACK_URL,
        scope: env.GITHUB_SCOPE
    },
    google : {
        clientId : env.GOOGLE_CLIENT_ID,
        clientSecret : env.GOOGLE_CLIENT_SECRET,
        callbackUrl : env.GOOGLE_CALLBACK_URL
    }
});