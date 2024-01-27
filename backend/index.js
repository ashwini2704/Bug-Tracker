const express = require("express")
const {connection} = require("./db");
const cors = require("cors");
const { bugRouter } = require("./Routes/bug.route");
const { userRouter } = require("./Routes/user.route");
require('dotenv').config();
const {UserModel } =  require("./Models/user.model.js");
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const port = process.env.PORT || 3000;



const app = express()
app.use(express.json())
app.use(cors());
app.use('/api/bugs', bugRouter)
app.use('/api',userRouter);

// setup session
app.use(session({
      secret:process.env.GOOGLE_CLIENT_SECRET,
      resave:false,
      saveUninitialized:true
  }))
  
  // setuppassport
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
      new OAuth2Strategy({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret:process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:"/auth/google/callback",
          scope:["profile","email"]
      },
      async(accessToken,refreshToken,profile,done)=>{
            console.log(profile)
          try {
              let user = await UserModel.findOne({email:profile.emails[0].value});
              if(!user){
                  user = new UserModel({
                      name:profile.displayName,
                      email:profile.emails[0].value,
                      avatar:profile.photos[0].value
                  });
  
                  await user.save();
              }
  
              return done(null,user)
          } catch (error) {
              return done(error,null)
          }
      }
      )
  )
  
  passport.serializeUser((user,done)=>{
      done(null,user);
  })
  
  passport.deserializeUser((user,done)=>{
      done(null,user);
  });
  
  // initial google ouath login
  app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));
  
  app.get("/auth/google/callback",passport.authenticate("google",{
      successRedirect:"http://localhost:3000/",
      failureRedirect:"http://localhost:3000/login"
  }))
  
  app.get("/login/sucess",async(req,res)=>{
  
      if(req.user){
          res.status(200).json({message:"user Login",user:req.user})
      }else{
          res.status(400).json({message:"Not Authorized"})
      }
  })
  
  app.get("/logout",(req,res,next)=>{
      req.logout(function(err){
          if(err){return next(err)}
          res.redirect("http://localhost:3000");
      })
  })

app.listen(port,async()=>{
    try{
        await connection()
        console.log(`Server is running at ${port}`);

    }catch(err){
         console.log(err);
    } 
})