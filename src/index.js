import dotenv from "dotenv";
import connectDb from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path: "./.env"
});


connectDb()
.then(() => {
    app.on("error", (err) => {
        console.log("ERROR: ", err);
        throw err
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.error("MongoDB connection Failed: ", err)
    throw err
})



// ;( async ()=> {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw err
//     }
// })()