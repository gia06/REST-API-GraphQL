import passport from "passport";
import passportJwt from "passport-jwt";
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
import usersService from "../service/UsersService.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await usersService.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
