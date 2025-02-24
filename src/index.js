import dotenv from "dotenv";
import connectDb from "./db/index.js";
dotenv.config({
    path: "./.env"
});


connectDb();



// ;( async ()=> {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()