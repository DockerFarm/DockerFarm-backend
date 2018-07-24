import Google from 'passport-google-oauth20';
import config from 'config';
import User from 'db/models/User';

const GoogleStrategy = Google.Strategy;

const googleStrategy = new GoogleStrategy({
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackUrl,
        scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findBySocialId({ provider: profile.provider, id: profile.id });

            if(!user) {
                user = await User.socialSignup({
                    provider: profile.provider,
                    accessToken,
                    username : profile.displayName,
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

export default googleStrategy;