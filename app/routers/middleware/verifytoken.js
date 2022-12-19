const jwt=require('jsonwebtoken');
const verifytoken=(req,res,next)=>{
    console.log(req.headers);
    const token=req.headers.token;
    if(!token)
    {
        res.send("jwt token is required");
    }
    else{
        jwt.verify(token,"Vikram@123",(err,decoded)=>{
            if(err)
            {
                res.json({auth:false,message:"Authentication failed"});
            }
            else{
                req.userId=decoded.id
            }

        });
    }
    next();

}
module.exports=verifytoken;