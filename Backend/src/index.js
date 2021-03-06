const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter  = require('./routers/userRouter')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
