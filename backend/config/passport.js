import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async(accessToken, refreshToken, profile, done) => {
      // Extract user details from Google profile
      // const user = {
      
      //   displayName: profile.displayName,
      //   email: profile.emails[0].value, // Access first email
      //   firstName: profile.name?.givenName,
      //   lastName: profile.name?.familyName,
      //   photo: profile.photos[0]?.value, // Profile picture URL
      //   provider: "google"
      // };

      try {
        let user=await User.findOne({email:profile.emails[0].value})
        if(!user){
          user=new User({
            name:profile.displayName,
            email:profile.emails[0].value,
            avatar:profile.photos[0]?.value,
            throughEmail:true
          });
          console.log(user)
          await user.save();
        }
        return done(null,user)
      } catch (error) {
        return done(error,null)
      }
    
    }
  )
);

// Serialize/Deserialize User
passport.serializeUser((user, done) => {
  done(null, user); // Store entire user object in session
});

passport.deserializeUser((user, done) => {
  done(null, user); // Retrieve user object from session
});
