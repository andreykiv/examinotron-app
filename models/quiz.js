const mongoose = require('mongoose')


const Quiz= mongoose.model('Quiz', {
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer1: {
        type: String,
        required: true,
        trim: true
    },
    answer2: {
        type: String,
        required: true,
        trim: true
    },
    answer3: {
        type: String,
        required: true,
        trim: true
    },
    answer4: {
        type: String,
        required: true,
        trim: true
    },
    correctAnswer: {
        type: Number,
        required: true,
        trim: true,
        validate(value){
            if(value < 1 || value >4){
                throw new Error("Solution not valid")
            }
        }
    }
})

module.exports = Quiz