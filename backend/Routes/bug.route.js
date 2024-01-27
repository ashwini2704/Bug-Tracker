const express = require("express");
const {auth} = require("../middleware/auth.middleware");
const {BugModel} = require('../Models/bug.model.js')
const bugRouter = express.Router();

bugRouter.post("/",auth,async(req,res)=>{
      try{
        const bug = new BugModel(req.body)
        await bug.save()
        res.status(200).send({"msg":"New bug has been added"})

      }catch(err){
        res.status(400).send({"error":err})
      }
})

bugRouter.get("/",auth,async(req,res)=>{
     try{
        const bug = await BugModel.find()
        res.status(200).send({"Allbugs" : bug})

     }catch(err){
        res.status(400).send({"error":err})
     }
})

bugRouter.patch("/:id",auth,async(req,res)=>{
    const {id} = req.params
    try{
        await BugModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({"msg":`Product with ID:${id} has been updated`})

    }catch(err){
       res.status(400).send({"error":err})
    }
})

bugRouter.delete("/:id",auth,async(req,res)=>{
    const {id} = req.params
    try{
        await BugModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":`Product with ID:${id} has been deleted`})

    }catch(err){
       res.status(400).send({"error":err})
    }
})


module.exports = {
      bugRouter
}
