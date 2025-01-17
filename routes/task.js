'use strict'
const List = require ('../models/List')

const express= require ('express');
const Task = require ('../models/Task')
const router = express.Router(); 


router.get('/tasks', async (req, res, next) =>{
    try {
        const listOfTasks = await Task.find(); 
        res.status(200).json({listOfTasks})
    }catch (error) {
        next(error)
    }
})


router.get('/tasks/:id', async (req,res,next) => {
    const { id } = req.params; 
    try {
        const specificTask = await Task.findById(id)
        res.status(200).json({specificTask})
    } catch(error){
        next(error)
    }
})

router.post('/tasks/new', async (req,res,next)=> {
    try{
      console.log(req.body)
        const {name, duedate, list, priority, notes, owner} = req.body;
        console.log("req.body", req.body);
        
        const createdTask =  await Task.create({name, duedate,list, priority, notes, owner})
        const updateList = await List.findByIdAndUpdate(createdTask.list, { $push: { tasks: createdTask._id}})
        
        
        res.status(200).json(createdTask)
    } catch(error) {
        next(error)
    }
})

router.put('/tasks/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const updatedTask = req.body;
    console.log(id)
    console.log(updatedTask)
    try {
      const updated = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  });

router.delete('/tasks/:id/delete', async (req, res, next) => {
    const { id } = req.params;
    try {
      const updatedAfterDelete = await Task.findByIdAndDelete(id);
      res.status(200).json({ updatedAfterDelete});
    } catch (error) {
      next(error);
    }
  });




module.exports=router; 