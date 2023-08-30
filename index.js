const express = require("express")

const app = express()

const PORT = 20000

app.listen(PORT ,()=>{
    console.log("El servidor esta corrriendo " + PORT)
})
