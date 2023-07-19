import local from "http"
const port:number=200;
const app:local.Server<
typeof local.IncomingMessage,
 typeof local.ServerResponse>
 =local.createServer((req:local.IncomingMessage,
    res:local.ServerResponse<local.IncomingMessage>
    )=>{
 
        const {method,url}=req
        if (method==="GET" && url ==="/") {
            
        }
    
},);

app.listen(port,()=>{
    console.log("it live");
})