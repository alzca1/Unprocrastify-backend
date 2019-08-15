'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;


const listSchema = new Schema({
  name:{
    type: String,
    required:true, 
    }, 
    color:{
    type: String,
    enum: ['yellow','green','blue','purple','orange','red']
    }, 
    tasks:[{
    type: ObjectId, 
    ref: 'Task'
    }], 
    owner:{
    type: ObjectId, 
    ref: 'User'
    }, 
    users:[{
    type: ObjectId, 
    ref: 'User'
    }], 
  },
  {
   timestamps: {
     createdAt: 'created_at', 
     updatedAt: 'updated_at'
   } 
}); 




const List = mongoose.model('List', listSchema);

module.exports = List;