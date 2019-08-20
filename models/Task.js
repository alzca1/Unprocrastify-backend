'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const taskSchema = new Schema({
  name:{
    type: String,
    required:true, 
    }, 
    duedate:{
    type: Date
    }, 
    priority:{
    type: String, 
    enum: ['none', 'low', 'medium', 'high'],
    default: 'none'
    }, 
    notes: {
    type: String
    },
    list:{
    type: ObjectId, 
    ref: 'List'
    },
    completed:{
      type: Boolean,
    },
    owner:{
      type: ObjectId,
      ref: 'User'
    },
    user:[{
      type: ObjectId, 
      ref: 'User'
    }]
  },
  {
   timestamps: {
     createdAt: 'created_at', 
     updatedAt: 'updated_at'
   } 
}); 




const Task = mongoose.model('Task', taskSchema);

module.exports = Task;