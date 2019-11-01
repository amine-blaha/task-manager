const express = require('express')
const Task = require('../db/models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(error)

    }

    // task.save().then( () => {
    //     res.status(201).send('All good')

    // }).catch( (error) => {
    //     res.status(400).send(error)

    // })
})

router.get('/tasks', auth, async (req, res) => {

    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
        console.log(sort)
    }

    try {
        //const tasks = await Task.find({ owner: req.user._id })

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }

        }).execPopulate()
        res.send(req.user.tasks)

    } catch (e) {
        res.status(500).send('Internal error')
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)

    // }).catch((e) => {
    //     res.status(500).send('Internal error')
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id})

        if(!task) {
            return res.status(400).send()
        }

        res.send(task)


    } catch (e) {
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if( !task) {
    //         return res.status(400).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => update = validUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send('invalid operation')
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:true })

        // const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if(!task) {
            res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)

    } catch (e) {
        res.status(400).send(e)

    }
})

router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        // const task = await Task.findByIdAndDelete(req.params.id)

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
 
        if(!task) {
            res.status(404).send('No task found')
        }

        res.send(task)

    } catch (e) {
        res.status(500).send('Internal error')
    }
})

module.exports = router