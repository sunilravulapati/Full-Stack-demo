import exp from 'express'
import { UserModel } from '../model/UserModel.js'

//create mini express app
export const userRoute = exp.Router()

//user api routes

//create
userRoute.post('/users', async (req, res) => {
    // get the user details from body
    let user = req.body;
    //save it in db
    const userDoc = new UserModel(user);
    let user1 = await userDoc.save()
    //send res
    res.status(201).json({ message: "user created successfully!", payload: user1 })
})

//read all users
userRoute.get('/users', async (req, res) => {
    //get users from the UserModel
    let users = await UserModel.find({ status: true })
    //send res
    res.status(200).json({ message: "users:", payload: users })
})

//read user by id
userRoute.get('/users/:uid', async (req, res) => {
    //get the user id from the url
    let uid = req.params.uid
    //find the user
    let checkUser = await UserModel.findOne({ _id: uid, status: true })
    if (!checkUser) {
        return res.status(404).json({ message: "user not found" })
    }
    //send res
    res.status(200).json({ message: "user:", payload: checkUser })
})

//delete user by id - soft delete
//for development use put request but for the client change it to delete
userRoute.delete('/users/:uid', async (req, res) => {
    //get the uid from the url 
    let uid = req.params.uid
    //find the user
    //check if the user is active
    //if active then change to deactive
    let user = await UserModel.findOneAndUpdate(
        { _id: uid, status: true },
        { $set: { status: false } }, // returns the previous user, use new:true to return a new user
    );
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    //send res
    res.status(200).json({ message: "user deleted", payload: user })
})

//activate the user
userRoute.patch('/users/:uid',async(req,res)=>{
    //get the uid from url params
    let uid = req.params.uid;
    //find the user
    let user = await UserModel.findByIdAndUpdate(uid,{$set:{status:true}},{new:true})
    //check if the user exists
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    //send res
    res.status(200).json({ message: "user activated!",payload:user})
})