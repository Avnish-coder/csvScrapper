const express = require("express");
const {postCsvKey,endFnKey,middleWareKey,getUsersKey,getQueryKey,filterDataKey,deleteDataKey,partialSearchKey,categorizedDataKey} = require("./fn.js")
const multer  = require('multer');
const { signin, signup } = require("./controller/auth.js");

const upload = multer({ dest: 'uploads/' })
const server = express();
server.use(express.json())

// use postman or thunder client for best  experience 
server.listen(8080);
let userRouter = express.Router();
let mainRouter= express.Router();
server.use("/users",userRouter);
server.use("/",mainRouter);

userRouter
.route("/")
.get(getUsersKey) // to get all data 
.post(upload.single('data.csv'),postCsvKey,middleWareKey) // to post file data to database

mainRouter
.route("/query") // you can search data by query of serial number
.get(getQueryKey)

mainRouter
.route("/sameData")
.get(filterDataKey)

mainRouter
.route("/partialSearch")
.get(partialSearchKey);

mainRouter
.route("/deleteData")
.get(deleteDataKey)

mainRouter
.route("/categorizedData")
.get(categorizedDataKey)

mainRouter
.route("/signIn")
.post(signin)

mainRouter
.route("/signUp")
.post(signup)

server.use(endFnKey)