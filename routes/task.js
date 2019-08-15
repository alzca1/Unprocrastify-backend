'use strict'

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
        const newTask = req.body;
        const createdTask =  await Task.create(newTask)
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
      await Task.findByIdAndDelete(id), {$set: updateData}, {useFindAndModify: false};
      res.status(200).json({ message: 'task deleted' });
    } catch (error) {
      next(error);
    }
  });




module.exports=router; 