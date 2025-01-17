// require('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({
    path:'./env'
})

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`SERVER IS RUNNING AT: ${process.env.PORT}`);
    });
}).catch((err)=>console.log("ERROR OCCURS! MONGODB CONNECTION FAILED!"));
// (async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log("ERROR OCCURS");
//             throw error;
//         })
//         app.listen(process.env.PORT,()=>{
//             console.log(`application is listening on port ${process.env.PORT}`);
//         })
//     }
//     catch(error)
//     {
//         console.error("ERROR",error);
//         throw error;
//     }
// })()