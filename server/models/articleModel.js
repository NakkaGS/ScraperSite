const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    name : {
        type: String,
        require: true
    },

    image : {
        type: String,
        require: false
    },

    category : {
        type: String,
        require: true
    },

    writer : {
        type: String,
        require: true
    },

    comments: {
        type: Number,
        require: true
    },

    text : {
        type: String,
         require: true
    },

    date : {
        type: String,
         require: true
    },

} , {
    timeStamps : true
})

const Article = mongoose.model('article', articleSchema)

module.exports = Article