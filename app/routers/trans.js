const express=require("express");
const router=express.Router();
const transcoll=require("../models/trans");
const verifytoken=require("./middleware/verifytoken");

router.get("/",async(req,res)=>{
try{
    const response=await transcoll.find();
    console.log(response);
    res.json(response);
}catch(err){
console.log(err);
}
});

router.get("/:acc",verifytoken,async(req,res)=>{
    try{
        console.log("112");
        trans = await transcoll.find({ $or: [ { to: req.params.acc }, { from: req.params.acc  } ] })
        return res.json(trans);
    }
    catch(err){
        console.log("err--rout",err);
      //  return res.json(trans);
    }
});


router.post("/",verifytoken,async(req,res)=>{
    console.log(req.body)
    const u=new transcoll({
        acc:req.body.acc,
        amount:req.body.amount,
        to:req.body.to,
        from:req.body.from,
        t_id:req.body.tid
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



//delete individual
router.delete("/:acc",async (req, res) =>{
    try {
        user = await transcoll.findOne({acc : req.params.acc} )
        if(user == null){
            return res.status(400).json({message: "user does not exist"})
        }
 
        await res.user.remove()

        res.status(200).json({message: "deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

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