import {Schema,model} from 'mongoose'

const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"name of the user is required"],
        minlen:[3,"minimum length is 3"]
    },
    email:{
        type:String,
        required:[true,"email of the user is required"],
        unique:[true,"email must be unique"]
    },
    dob:{
        type:Date,
        required:[true,"dob of the user is required"],
        default: new Date()
    },
    mobile:{
        type:Number,
        required:[true,"number is required for stealing ur info"]
    },
    //for soft delete
    status:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true,
    strict:"throw",
    versionKey:false
})

export const UserModel = model('user',userSchema)