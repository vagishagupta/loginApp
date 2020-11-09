const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/userModel')

router.post('/users',async (req, resp) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        resp.status(200).send({ user, token })
    }
    catch (e) {
        resp.status(400).send(e)
    }
})

router.post('/users/login', async (req, resp) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        resp.send({ user, token })
    }
    catch (e) {
        resp.status(400).send(e)
    }
})
router.post('/users/logout', auth, async (req, resp) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        resp.send()
    }catch (e) {
        console.log(e)
        resp.status(500).send(e)
    }
})
router.post('/users/logoutAll', auth, async (req, resp) => {
    try {
        req.user.tokens = []
        await req.user.save()
        resp.send()
    }catch (e) {
        console.log(e)
        resp.status(500).send(e)
    }
})
router.get('/users', auth, async (req, resp) => {
    try {
        const user = await User.find({})
        resp.send(user)
    }
    catch {
        resp.status(500).send(e)
    }
})
router.get('/users/me', auth, async (req, resp) => {
    resp.send(req.user)
})
router.get('/users/:id', async (req, resp) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return resp.status(404).send()
        }
        resp.status(200).send(user)
    }
    catch {
        resp.status(500).send(e)
    }
})

router.patch('/users/:id', async (req, resp) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return resp.status(400).send({ error: "Invalid updates" })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        const user = await User.findByIdAndUpdate(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return resp.status(400).send()
        }
        resp.send(user)
    }
    catch (e) {
        resp.status(500).send(e)
        console.log(e)
    }
})

module.exports = router