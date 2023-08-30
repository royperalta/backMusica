const express = require("express")
const route = require("./routes.js")
const app = express()

app.use("/api",route)


const PORT = 20000

app.listen(PORT ,()=>{
    console.log("El servidor esta corrriendo " + PORT)
})
