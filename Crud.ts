import http from "http";
import fs from "fs"
import path from "path"

interface IDataEntry {
  id: number;
  course: string;
}

interface iData {
  status: number;
  message: string;
  name: string;
  sucess: boolean;
  data: IDataEntry[]|IDataEntry | null;
}

let dataEntry = [
  { id: 1, course: "node" },
  { id: 2, course: "react" },
];
let data: iData = {
  message: "request not found",
  name: "request Error",
  status: 404,
  sucess: false,
  data: null,
};

const port: number = 5055;
const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    const { method, url } = req;

    let Body:any=[]
    req.on("data",(chunk)=>{
        Body.push(chunk)
        console.log(chunk);
        console.log(Body);
    })
    req.on("data", () => {
        // reading from static Db
      if (method === "GET" && url === "/") {
        data.message = "reading from dataBase",
          data.name = "Get request",
          data.status = 200,
          data.sucess = true,
          data.data = dataEntry;
    } 
    // writing from static DB
    else if (method === "POST" && url ==="/"){
        dataEntry.push(JSON.parse(Body));
        data.message = "writing from dataBase",
          data.name = "Post request",
          data.status = 201,
          data.sucess = true,
          data.data = dataEntry;
       
    } 
    // single from static DB
    else if (method==="GET"){
     let id = req.url?.split("/")[1]
     data.message=""
    }
     //    reading from static DB
    else {
        data.message="Resquest not found";
        data.name="Request Error";
        data.status=404;
        data.sucess=false;
        data.data=null;
      }
      res.writeHead(data.status,{
        "content-type":"application/json"
      })
      res.end(JSON.stringify(data))
    });
  }
);

server.listen(port,()=>{
    console.log("server is listening");
})
