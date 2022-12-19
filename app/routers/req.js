const express=require("express");
const router=express.Router();
const reqcoll=require("../models/requestmoney");
const verifytoken = require("./middleware/verifytoken");


router.get("/",async(req,res)=>{
    try{
	response=await reqcoll.find();
        res.json(response);   
    }
    catch(err){
        console.log("err",err);
    }

});



router.get("/:acc/:id",verifytoken,async(req,res)=>{
    try{
        if (req.params.id=="0"){
        trans = await reqcoll.find({ by: req.params.acc } )
         res.json(trans);

        }
        else{
            trans = await reqcoll.find({ to: req.params.acc } )   
             res.json(trans);
        }
    }
    catch(err){
        console.log("err",err);
    }
});



router.post("/",verifytoken,async(req,res)=>{
    console.log(req.body)
    const u=new reqcoll({
        by:req.body.by,
        amount:req.body.amount,
        to:req.body.to
    })
    try{
        const response=await u.save();
        res.json(response);
        
    }catch(err){
    res.send(err);
    }
    });

/*


//update individual
router.patch("/:acc", getuser, async (req, res) =>{
    if(req.body.amount != null){
        res.user.amount = req.body.amount
    }
    try {
        const updatedStudent = await res.tran.save()
        res.status(200).json(updatedStudent)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
*/


//delete individual
router.delete("/:id",async (req, res) =>{
    try {
        console.log("id in del back end ",req.params.id);
       reqcoll.findByIdAndRemove(req.params.id, function (err, doc) {
            if (err) console.log(err);
            res.status(200).json({message: "deleted succesfully"})

            });
            

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


/*
    async function getTrans(req,res,nxt) {
        let student
        try {
            student = await transcoll.findOne({acc : req.params.acc})
            if(student == null){
                return res.status(400).json({message: "user does not exist"})
            }
        } catch (error) {
            res.status(500).json({message: error.message})
        }
        res.tran= student
        nxt()
    }
*/

module.exports=router
