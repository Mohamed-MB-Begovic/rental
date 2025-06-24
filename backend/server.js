import express from 'express'
import path from 'path'
import Connect from './config/db.js';
import cors from 'cors'
import router from './routes/auth.js'
import session from "express-session";
import passport from 'passport';
import './config/passport.js'
import propertyRoutes from './routes/propertyRoutes.js';
import tenantRouter from './routes/tenants.js';
import leaseRouter from './routes/lease.js';
import PaymentRouter from './routes/payment.js';
import jwt  from 'jsonwebtoken';
import { JWT_SECRET } from './config/config.js';
import cookieParser from 'cookie-parser';
import ScheduleTourRouter from './routes/scheduleTour.js';
import MongoStore from 'connect-mongo';
const app = express();

 
app.use(express.json());
app.use(cors({
  origin: 'https://rental-3rsb.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(cookieParser())
;
// Session Configuration
app.use(session({
  secret: 'mb-begovic-9900',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://mohamedmohamudabdulahiabdi:rMlIHF49UXEyYpiD@cluster0.kwuqxyq.mongodb.net/HRMS'
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

 

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
  })
);

// Auth Status Check
app.get('/api/login/success', (req, res) => {
  if (req.user) {
console.log(req.user)
   const expiresIn=7*24*60*60
            const token=jwt.sign({_id:req.user._id},JWT_SECRET,{
                expiresIn
            })

            res.cookie('token',token,{
                httpOnly:true,
                maxAge:expiresIn *1000,
                secure:false
            })
    res.status(200).json({
      authenticated: true,
      user:req.user
    })
  } else {
    res.status(200).json({ authenticated: false }); // Never send 401 here
  }
});

// Logout Route
app.get('/api/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ success: false });
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.status(200).json({ success: true });
  });
});

// Connect Other Routes
app.use('/api/auth', router);
app.use('/api/properties', propertyRoutes);
app.use('/api/tenants', tenantRouter);
app.use('/api/lease',leaseRouter)
app.use('/api/payments',PaymentRouter)
app.use('/api/scheduleTour',ScheduleTourRouter)


const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/frontend/dist")))


app.get("*get",(req,res)=>{
  res.send(path.resolve(__dirname,"frontend","dist","index.html"))
})

// Database Connection
Connect();
const PORT = 9000|| process.env.PORT  ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
