const mongoose = require("mongoose");
const fs = require("fs");
const res = require("express/lib/response");

function postCsv(req, res, next) {        
              // fs.writeFileSync(upload,JSON.stringify(req.file))
              let jsonData = converter(req.file.path)
              createData(jsonData);
              console.log(jsonData);
              next()
              res.json({
                            "message" : "file accepted"
              })
}

async function getUsers(req,res) {
              let data = await dataModel.find()
              res.json({
                          "data"  : data  
              })  
}

function converter(path) {
              const CSVToJSON = csv => {
                  const lines = csv.split('\n');
                  const keys = lines[0].split(',');
                  return lines.slice(1).map(line => {
                      return line.split(',').reduce((acc, cur, i) => {
                          const toAdd = {};
                          toAdd[keys[i]] = cur;
                          return { ...acc, ...toAdd };
                      }, {});
                  });
              };
              let data = fs.readFileSync(path, "utf-8");
              let obj = CSVToJSON(data);
              return obj
}

async function createData(data) {
              let users = await dataModel.create(data)
              res.json({
                  "message" : "message accepted"
              })
}

async function getQuery(req,res) {
    let data = await dataModel.findOne(req.query)
    res.json({
        "result" : data
    })
    
}

async function filterData(req,res) {
    let data = await dataModel.find(req.query)
    res.json({
        "result" : data
    })
    
}
async function deleteData(req,res) {
    let data = await dataModel.deleteMany(req.query)
    res.json({
        "result" : data
    })
    
}
async function partialSearch(req,res) {
    let key = Object.keys(req.query)[0]
    let values = Object.values(req.query)[0]
    let obj = {};
    obj[key] = { $regex: values, $options: "i" }
    let data = await dataModel.find(obj);
    res.json({
        data
    })
    
}
async function categorizedData(req,res) {
    let category1 = {"gender": "Male"}
    let category2 = {"gender": "Female"}
    let male = await dataModel.find(category1);
    let female = await dataModel.find(category2);
    res.json({
        "Male" : male,
        "Female" : female
    })
    
}



function endFn(req,res) {
              res.statusCode = 404
              res.send("<h1>Invalid Request</h1>")
              
}

function middleWare(req,res,next) {
              console.log("hello");
}

const url = "mongodb+srv://avnishsharma0420:Avsksharma@cluster0.5tzzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(url)
.then((db) =>{
              console.log("dataBase is connected");
})
.catch((err)=>{
              console.log(err);

})

let dataSchema = mongoose.Schema({
              serialNumber:{
                            type : String,
                            required : true,
                            unique : true,

              },
              first_name :{
                            type : String,
                            required : true,
                            unique : true,
              },
              last_name : {
                            type : String,
                            required : true,
                            unique : true,       
              },
              email : {
                            type : String,
                            required : true,
                            unique : true,          
              },
              gender: {
                            type : String,
                            required : true,
                            // unique : true,

              },
              ip_address: {
                            type : String,
                            required : true,
                            unique : true
              }
})

const dataModel = mongoose.model("dataModel",dataSchema)


module.exports ={
    postCsvKey : postCsv,
    endFnKey : endFn,
    middleWareKey : middleWare,
    getUsersKey : getUsers,
    getQueryKey : getQuery,
    filterDataKey : filterData,
    deleteDataKey : deleteData,
    partialSearchKey : partialSearch,
    partialSearchKey : partialSearch,
    categorizedDataKey : categorizedData,

}
