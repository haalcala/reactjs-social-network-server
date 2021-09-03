const router=require("express").Router()

router.get("/",(req,res)=> {
    res.send("Holy forking shirtball! It worked again!")
})

export default router