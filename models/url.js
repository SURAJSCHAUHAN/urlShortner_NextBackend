import mongoose from "mongoose";

// mongoose.Promise=global.Promise;

const urlSchema=mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    visitHistory:[{visitTime:{type:Date}}]
},{
    timestamps:true
});


module.exports=mongoose.models.URL || mongoose.model('URL',urlSchema);
