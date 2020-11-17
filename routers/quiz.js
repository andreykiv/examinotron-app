const express = require('express')
const router = new express.Router()
const Quiz = require('../models/quiz')

router.post('/quizs', async (req, res) => {
    const quiz = new Quiz(req.body)
    let question = req.body.question
    let answer1 = req.body.answer1
    let answer2 = req.body.answer2
    let answer3 = req.body.answer3
    let answer4 = req.body.answer4
    let newQuiz = {question, answer1, answer2, answer3, answer4}

    try {
        await quiz.save(newQuiz)
        // res.status(201).send(newQuiz)
        res.status(201).redirect("/")
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/quizs', async (req, res) => {
    try {
        const quizs = await Quiz.find({})
        res.send(quizs)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/quizs/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const quiz = await Quiz.findById(_id)

        if (!quiz) {
            return res.status(404).send()
        }

        res.send(quiz)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/quizs/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['question', 'answer1', 'answer2', 'answer3', 'answer4']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!quiz) {
            return res.status(404).send()
        }

        res.send(quiz)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/quizs/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id)

        if (!quiz) {
            res.status(404).send()
        }

        res.send(quiz)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router