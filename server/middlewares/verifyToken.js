import jwt from 'jsonwebtoken';
const verifyToken = (req,res,next)=>{
  const token = req.cookies.token
  if(!token){
    return res.status(402).json({
      success:false,
      message:"Token not found"
    })
  }
    jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
      if(err){
return res.status(402).json({
  success:false,
  message:'Unauthorized Person'
})
      }
      req.userId= user._id
    next()
    })
    
  

}