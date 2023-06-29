import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

dotenv.config();

const email = ['emancap12@gmail.com'];

passport.use(
    "auth-google",
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_API
    },
        function (accessToken, refreshToken, profile, cb) {
          return cb(null, profile);
        }
    ));