require("dotenv").config();
var express=require("express"),
request    =require("request"),
app        =express(),
mongoose   =require("mongoose"),
body       =require("body-parser"), 
cron       =require("node-cron"),
nodemailer =require("nodemailer"), 
passport        =require("passport"),
passportlocal       =require("passport-local"),
passportlocalmongoose   =require("passport-local-mongoose"),
flash                   =require("connect-flash"),
session                 =require("express-session"),
MongoStore              =require("connect-mongo"),

http       =require("http").createServer(app);
var port=process.env.PORT || 2001;
// https      =require("https").createServer(app)
mongoose.connect("mongodb+srv://allChats:XQ23JMC6hsPCv4AZ@mongodb-tutorial.wvkvs.mongodb.net/allchat?retryWrites=true&w=majority")


app.use(session({
  secret:"Grocery",
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({
    mongoUrl: 'mongodb+srv://allChats:XQ23JMC6hsPCv4AZ@mongodb-tutorial.wvkvs.mongodb.net/allchat?retryWrites=true&w=majority',
     // time period in seconds
    collection:"session"
  }),
    //new mongoDbStore({ mongooseConnection:mongoose.connection,collection:"sessions"}),
  cookie:{maxAge:1800*600*1000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(body.urlencoded({extended:true}))
var userSchema=new mongoose.Schema({
   
   username:String,
   password:String,
   phone:Number,
   profileType:String,
   gender:String,
   DOB:String,
   willing:Boolean,
   religion:String,
   MT:String,
   caste:String,
   height:String,
   MS:String,
   disability:Boolean,
   FS:String,
   FT:String,
   FV:String,
   Education:String,
   EmployedIn:String,
   Occupation:String,
   AnnualIncome:String,
   workLocation:String,
   ResidingState:String,
   ResidingCity:String,
   AboutYou:String,
   Image:String,
   first:String,
   last:String,
   name:String,
   status:String,
   date:{type:Date,default:Date.now()}
})
 userSchema.plugin(passportlocalmongoose)
 var user=mongoose.model("user",userSchema)
passport.use(new passportlocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser=req.user
  next()
})
app.get("/",function(req,res){

	res.render("chat.ejs")
})

app.get("/create",function(req,res){

  res.render("create.ejs") 
})


// app.get("/login",function(req,res){


//   res.render("")

// })


app.post("/create",function(req,res){

  user.create({name:req.body.names},function(err,users){

   res.redirect("/allusers")

  })

})

app.get("/allusers",function(req,res){


  user.find({},function(err,users){

     res.render("alluser.ejs",{users:users})

  })
})



app.get("/test",function(req,res){
 console.log("croned")
       var date = new Date();
 console.log(date.toISOString().split('T')[0])
 user.find({},function(err,users){
   for (var i=0;i<users.length;i++){
     user.findById(users[i]._id,function(err,info){

// date.setDate(date.getDate() - 30);
// var dateString = date.toISOString().split('T')[0]; // "2016-06-08"
      if(info.status=="paid"){

        info.updateOne({status:"notpaid"},function(err,infos){
                
              // console.log(info.date.getFullYear())

        })
      }
 

})
 }

 })
 }) 



      




app.get("/",function(req,res){

  res.render("login.ejs")
})


app.post("/registering",function(req,res){
   
    console.log("here")
    res.render("firstpage.ejs",{first:req.body.first,profileType:req.body.profiletype,last:req.body.last,phone:req.body.phone,gender:req.body.gender})


})


app.post("/secondpage",function(req,res){
  
    console.log("here")
    res.render("secondpage.ejs",{first:req.body.first,gender:req.body.gender,profileType:req.body.profiletype,last:req.body.last,phone:req.body.phone,dob:req.body.dob,religion:req.body.religion,mt:req.body.mt,email:req.body.email,password:req.body.password})


})



app.post("/thirdpage",function(req,res){
 
 
    if (req.body.checking=="willing"){

      var value=true
    }
    else{

      var value=false
    }
    res.render("thirdpage.ejs",{first:req.body.first,profileType:req.body.profiletype,gender:req.body.gender,last:req.body.last,phone:req.body.phone,dob:req.body.dob,religion:req.body.religion,mt:req.body.mt,email:req.body.email,password:req.body.password,caste:req.body.caste,willing:value})


})





app.post("/fourthpage",function(req,res){
  
    if (req.body.disab=="yes"){

      var value=true
    }
    else{

      var value=false
    }
    res.render("fourthpage.ejs",{first:req.body.first,profileType:req.body.profiletype,gender:req.body.gender,last:req.body.last,phone:req.body.phone,dob:req.body.dob,religion:req.body.religion,mt:req.body.mt,email:req.body.email,password:req.body.password,caste:req.body.caste,willing:req.body.willing,height:req.body.height,ms:req.body.ms,disability:value,fs:req.body.fs,ft:req.body.ft,fv:req.body.fv})



})


app.post("/fifthpage",function(req,res){
 
    var about="I'm self-employed with a bachelor's degree currently living in kolkata.I belong to a middle class,nuclear family with traditional values"

    if (req.body.disab=="yes"){

      var value=true
    }
    else{

      var value=false
    }
    res.render("fifthpage.ejs",{first:req.body.first,profileType:req.body.profiletype,gender:req.body.gender,last:req.body.last,phone:req.body.phone,dob:req.body.dob,religion:req.body.religion,mt:req.body.mt,email:req.body.email,password:req.body.password,caste:req.body.caste,willing:req.body.willing,height:req.body.height,ms:req.body.ms,disability:req.body.disab,fs:req.body.fs,ft:req.body.ft,fv:req.body.fv,eds:req.body.ed,eis:req.body.ei,ocs:req.body.oc,ais:req.body.ai,wls:req.body.wl,rss:req.body.rs,rcs:req.body.rc,about:about})



})


app.post("/sixthpage",function(req,res){
  
var code=Math.floor(Math.random()*11223)
    var transport=nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:"grocery.ofc@gmail.com",
        pass:process.env.password
      }
    }); 


      var mailoptions={
        from:"grocery.ofc@gmail.com",
        bcc:`${req.body.email}`,
        subject:"GroceryJi",
        html:`Hi,${req.body.first},welcome to GatbandhanMatrimony<br>please activate your account<br>
            Your activation code is <b>${code}</b>
            
            
            </form>
            `
      }
                console.log("hmmmmm")
        transport.sendMail(mailoptions,function(err,info){
          if(err)
          {
            req.flash("error","something went wrong...");

            res.redirect("/login");
          }
            else{
              console.log("here")

                res.render("sixthpage.ejs",{first:req.body.first,profileType:req.body.profiletype,gender:req.body.gender,last:req.body.last,phone:req.body.phone,dob:req.body.dob,religion:req.body.religion,mt:req.body.mt,email:req.body.email,password:req.body.password,caste:req.body.caste,willing:req.body.willing,height:req.body.height,ms:req.body.ms,disability:req.body.disab,fs:req.body.fs,ft:req.body.ft,fv:req.body.fv,eds:req.body.ed,eis:req.body.ei,ocs:req.body.oc,ais:req.body.ai,wls:req.body.wl,rss:req.body.rs,rcs:req.body.rc,about:req.body.about,code:code})

            }


        

})
   



})


app.post("/registered",function(req,res){
      // if(req.files)
      // {
      //  var file=req.files.filename,
      //    filesname=file.name;
      //    file.mv("./public/"+filesname);
      // }
      if(req.body.two)
      {
      if(req.body.one!==req.body.two)
      {
         req.flash("error","Your code was wrong,it's destroyed,try again...")
         res.redirect("/login")
      }
      
      
      
      else{
      user.register(new user({username:req.body.username,first:req.body.first,last:req.body.last,name:req.body.first + " " + req.body.last,profileType:req.body.profiletype,gender:req.body.gender,phone:req.body.phone,DOB:req.body.dob,religion:req.body.religion,MT:req.body.mt,caste:req.body.caste,willing:req.body.willing,height:req.body.height,MS:req.body.ms,disability:req.body.disab,FS:req.body.fs,FT:req.body.ft,FV:req.body.fv,Education:req.body.ed,EmployedIn:req.body.ei,Occupation:req.body.oc,AnnualIncome:req.body.ai,workLocation:req.body.wl,ResidingState:req.body.rs,ResidingCity:req.body.rc,AboutYou:req.body.about,Image:"jjj.jpg",date:Date.now()}),req.body.password,function(err,user){
          
    if(err)
    {
      
        console.log(err);
      return res.redirect("/login");  
    }
  
      
      
      passport.authenticate("local")(req,res,function(){
        

        res.redirect("/allusers");
      });
    

}); 
}
}
else{
    req.flash("error","Please give the code as input...")
    res.redirect("back")

}
});

app.get("/logout",function(req,res){
  
   req.logout()

   res.redirect("/allusers")
})
app.post("/login",passport.authenticate("local",{
successRedirect:"/allusers", 
failureRedirect:"/"
}),function(req,res){

});
http.listen(port,function(){

	console.log("srever started")
})






app.get("/user/:id",function(req,res){

  user.findById(req.params.id,function(err,users){

    res.render("chat.ejs",{users:users})
  })
})

app.get("/update/:id",function(req,res){

  user.findById(req.params.id,function(err,users){
  
             users.updateOne({status:"paid",date:Date.now()},function(err,info){

      res.redirect("back")
})
  })
})
var io=require("socket.io")(http)

io.on("connection",function(socket){

	console.log("connected")

 

 socket.on("types",function(msg){
 
   console.log(msg)
   console.log(msg.keys)
 
 	socket.broadcast.emit("types",msg.keys)
 })

 socket.on("join",function(msg){
   

    socket.join(msg.ids)
   console.log(msg.ids)

 })

 socket.on("message",function(msg){

  socket.broadcast.to(msg.ids).emit("message",msg)
  console.log(msg.ids)
 }) 

})
