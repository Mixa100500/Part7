const mongoose = require('mongoose')

const commentShama = new mongoose.Schema({
  content: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blog'
  }
})

commentShama.set('toJSON', {
  transform: (document, returnedOject) => {
    returnedOject.id = returnedOject._id.toString()
    delete returnedOject._id
    delete returnedOject.__v
  }
})

module.exports = mongoose.model('Comment', commentShama)