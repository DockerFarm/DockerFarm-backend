import Github from 'passport-github';
import config from 'config';
import User from 'db/models/User';
const GitHubStrategy = Github.Strategy;

const githubStrategy = new GitHubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackUrl,
        scope: 'user:email'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findBySocialId({ provider: profile.provider, id: profile.id });

            if(!user) {
                user = await User.socialSignup({
                    provider: profile.provider,
                    accessToken,
                    username : profile.username,
                    socialId: profile.id,
                    email: profile.emails[0].value
                });
            }

            return done(null, user);
        } catch(e) {
            return done(e, null);
        }
    }
);

export default githubStrategy;