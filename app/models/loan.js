const mongoose=require("mongoose");
const loanschema=new mongoose.Schema({
    acc:{
        type:String,
        required:true
    },
    loan_amount:{
        type:String,
        required:true   
    },
    interest:{
        type:String,
        required:true
    },
    no_of_months:{
        type:String,
        required:true
    },
    amount_to_be_payed :{
        type:Number,
        required:true
    },
      profileImg: {
            type: String,
            required:true
        }
    
})

module.exports=mongoose.model('loancoll',loanschema);