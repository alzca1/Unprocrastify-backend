'use strict'

const express= require ('express');
const List = require ('../models/List')
const router = express.Router(); 


router.get('/lists', async (req, res, next) =>{
    try {
        const listOfLists = await List.find().populate('tasks'); 
        res.status(200).json({listOfLists})
        console.log(listOfLists[1].tasks)
    }catch (error) {
        next(error)
    }
})

router.get('/lists/:id', async (req,res,next) => {
    const {id} = req.params; 
    try {
        const specificList = await List.findById(id)
        res.status(200).json({specificList})
    } catch(error){
        next(error)
    }
})

router.post('/lists/new', async (req,res,next)=> {
    try{
      const {name, color,  tasks, owner, users} = req.body;
      const createdList =  await List.create({name, color, tasks, owner, users})
      res.status(200).json(createdList)
    } catch(error) {
        next(error)
    }
})

router.put('/lists/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const updatedList = req.body;
    console.log(id)
    console.log(updatedList)
    try {
      const updated = await List.findByIdAndUpdate(id, updatedList, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  });

router.delete('/lists/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
      await List.findByIdAndDelete(id), {$set: updateData}, {useFindAndModify: false};
      res.status(200).json({ message: 'list deleted' });
    } catch (error) {
      next(error);
    }
  });


  




module.exports=router; 