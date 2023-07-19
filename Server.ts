// Study on the Status Codes and give 2 exampple of each of the series
// endpoint is the route from the backend that gives you access to the
//server
// url is the point that allow you to view the frontend 
// study on http 




import http,{ServerResponse} from "http";

const server = http.createServer(
    (req:http.IncomingMessage, res:http.ServerResponse<http.IncomingMessage>)=>{
        res.writeHead((res.statusCode=200),{
            "content-type":"text/html",
        })
        const data = req.rawHeaders[7].split("")[5]
        const postData = req.rawHeaders[4].split("-")[1]
        console.log();

        if(data === undefined){
        res.write(`you are using "${postData}" to acess me`)
         
        }else{
            res.write(`you are using "${data}" to acess me`)
        }


        res.end();

        const { method, url } = req;
        if(method === "GET" && url){
                    res.write("i am gome")
    }else{
        
    }
});

server.on("connection",()=>{
    console.log("a user is connected");
})

server.listen(3322,()=>{
    console.log();
    console.log("server is live....!");
})
