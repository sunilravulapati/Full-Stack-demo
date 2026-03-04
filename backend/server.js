//create http server
import exp from 'express'
import { userRoute } from './APIs/UserAPI.js'
import { config } from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'
config()

const app = exp()

app.use(exp.json()) //body parser middleware
app.use(cors({
    origin:["http://localhost:5173"]
}))
//user route
app.use('/user-api', userRoute)

//connect to db
const connectDB = async () => {
    try {
        await connect(process.env.DB_URL)
        console.log("DB Connection Successful!")
        // start the http server
        app.listen(process.env.PORT, () => console.log("server started!"))
    } catch (err) {
        console.log("error occured")
    }
}
connectDB()
//error handling middleware
app.use((err, req, res, next) => {
    // Mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.errors,
        });
    }
    // Invalid ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid ID format",
        });
    }
    // Duplicate key
    if (err.code === 11000) {
        return res.status(409).json({
            message: "Duplicate field value",
        });
    }
    res.status(500).json({
        message: "Internal Server Error",
    });
});