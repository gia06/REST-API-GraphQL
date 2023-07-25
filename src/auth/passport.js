const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const usersService = require("../service/UsersService");
const dotenv = require("dotenv");

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
