const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const route = require("./routes.js")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use('/music', express.static('./downloads'))
app.use("/api", route)



const PORT = 20000

app.listen(PORT, () => {
    console.log("El servidor esta corrriendo " + PORT)
})

