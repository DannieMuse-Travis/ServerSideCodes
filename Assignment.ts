import http, { ServerResponse, createServer } from "http"
import fs from "fs"
import path from "path"
import database from "./Backend"


interface iDataEntry{
    id:number;
    course:string
}

interface iData{
    message:string;
    status: number;
    name:string;
    sucesss: boolean;
    data: null| iDataEntry[] | iDataEntry
}
let dataEntry: iDataEntry[] = [
    {id:1, course:"Node"},
    {id:2, course:"React"},
]

let data:iData ={
    message: "Request not found",
    status: 404,
    name:"Request Error",
    sucesss: false,
    data: null
}


const server :http.Server<
typeof http.IncomingMessage,
typeof http.ServerResponse
> = createServer((req:http.IncomingMessage, res:ServerResponse<http.IncomingMessage>)=>{
    const {method,url} = req
    let Datapath= path.join(__dirname,"Backend","Index.json")

    
    let body:any= []
    req.on("data",(chunk)=>{
        body.push(chunk)
        console.log(chunk)
        console.log(body)
    })




    req.on("data",()=>{
        // Reading from Database
        if(method ==="GET" && url==="/"){
            let readFile= fs.readFile(Datapath,"utf-8",(err,message)=>{
                if(err){
                    throw err
                }else{
                    console.log(JSON.parse(message));
                }
            })
            console.log(readFile)
            data.message = "Reading from Database"
            data.status = 200
            data.name = "GET REQUEST"
            data.sucesss = true
            data.data = dataEntry

        }
          // Writing to Database
          else if(method ==="POST" && url ==="/"){
            fs.writeFile(Datapath,JSON.stringify(dataEntry),()=>{
                console.log("DONE.....")
            })
            dataEntry.push(JSON.parse(body))
            data.message = "Writing to Database"
            data.status = 201
            data.name = "POST REQUEST"
            data.sucesss = true
            data.data = dataEntry

        }

        
        // Single get from Database
        else if(method==="GET") {
            let id = req.url?.split("/")[1]
            data.message= "Reading single Item from Database";
            data.name= "GET-ONE Request";
            data.status= 201;
            data.sucesss= true;
            data.data= dataEntry[parseInt(id!)-1];
  
        }
        // Deleting from Database
        else if(method==="DELETE") {
            fs.unlink(Datapath,(err)=>{
                if(err){
                    throw err
                }else{
                    console.log("Deleting completed");
                }
            })
            let id = parseInt(req.url?.split("/")[1]!)
            console.log(id)
            let Value= dataEntry.filter((el)=>{
                return el.id === id
            })
            // console.log(Value)
            data.message= "Deleing  from Database";
            data.name= "DELETE-ONE Request";
            data.status= 201;
            data.sucesss= true;
            data.data= Value;
  
        }
        // Updating from Database
        else if(method==="PATCH") {
            const{course}= JSON.parse(body)
            let id = parseInt(req.url?.split("/")[1]!)-1
           
            fs.appendFile(Datapath,"[{'id': 5, 'course':'html'}]",(err)=>{
                if(err){
                    throw err
                }
            })

            dataEntry[id].course= course
            data.message= "Updating from Database";
            data.name= "UPDATE-ONE Request";
            data.status= 200;
            data.sucesss= true;
            data.data= dataEntry;
  
        }
          

        else{
            data.message="Request not found"
            data.status=404
            data.name="Request Error"
            data.sucesss=false
            data.data=null

        }
        res.writeHead(200,{"content-type": "application/json"})
        res.write(JSON.stringify(data))
        res.end()
    
    })



})

let port:number= 5000
server.listen(port,()=>{
    console.log("Server is live!! ", port)
})


// import express, { Application,Request,Response } from "express"

// const PORT:number = 4044;

// const app:Application = express()



// app.get("/",(req:Request,res:Response)=>{
//     return res.status(200).json({
//         message:"api is successfully registered"
//     })
// })

// app.listen(PORT,()=>{
//     console.log(`Connect to port ${PORT}`);
// })