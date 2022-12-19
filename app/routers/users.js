const express=require("express");
const router=express.Router();
//http://localhost:5000/api-docs/#/ for swagger 
const verifytoken=require("./middleware/verifytoken");
const usercoll=require("../models/users");
router.get("/",async(req,res)=>{

    try{    const response=await usercoll.find();
        console.log(response);
        res.json(response);
    }
    catch(err){
        console.log("err");

    }

});

router.get("/:acc",async(req,res)=>{
    try{
        user = await usercoll.findOne({ $or: [ {acc : req.params.acc }, { name: req.params.acc  } ]  } )
        if(user == null){
            return res.status(400).json({message: "user1 does not exist"})
        }  
        console.log(user);
        res.json(user);
    }
    catch(err){
        console.log("err");
    }
});


//update individual
router.patch("/:acc", getuser, async (req, res) =>{
    if(req.body.balance != null){
        res.user.balance = req.body.balance
        res.user.markModified('balance');
    }
    try {
        const updatedStudent = await res.user.save()
        res.status(200).json(updatedStudent)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



//delete individual
router.delete("/:acc",async (req, res) =>{
    try {
        //await 
        user = await usercoll.findOne( {acc : req.params.acc } )
        console.log(user._id);
        id=user._id
        usercoll.findByIdAndDelete(id,  function (err, doc) {
                   if (err) console.log(err);
               res.status(200).json({message: "deleted succesfully"})
       
        });


    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


router.post("/",async(req,res)=>{
    console.log(req.body)
    const u=new usercoll({
        balance:req.body.balance,
        name:req.body.name,
        acc:req.body.acc,
        password:req.body.password,
        mail:req.body.mail
    })
    try{
        const response=await u.save();
        res.json(response);
        
    }catch(err){
    res.send(err);
    }
    });




async function getuser(req,res,nxt) {
        let student
        try {
            student = await usercoll.findOne({acc : req.params.acc})
            if(student == null){
                return res.status(400).json({message: "user does not exist"})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        res.user = student
        nxt()
    }



module.exports=router
