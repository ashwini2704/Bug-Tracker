const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
      title : String,
      description : String,
      source : String,
      severity : {
            type : String,
            enum : ['Critical', 'Major', 'Medium', 'Low'],
            required : true
      },
      raised_by :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      updated_at: {
        type: Date,
        default: Date.now,
      }
},
{
      versionKey : false
}
)

const BugModel = mongoose.model('Bug', bugSchema);

module.exports = {
      BugModel
}