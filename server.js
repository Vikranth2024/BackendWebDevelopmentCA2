const express = require("express")
const app = express()

app.use(express.json())


const users = [
    {username : "alice", age: 25,email: "alice@example.com" },
    {username : "bob", age: 30,email: "bob@example.com" },
    {username : "charlie", age: 28,email: "charlie@example.com" }
]

app.get("/",(req,res) =>{
    res.send("Hi")
})

app.get("/:age",  (req,res) =>{
    try {
    const age = req.params.age
    if(!age){
        res.status(401).json({"message": "User parameter cannot be empty"})
    }
    const userDetails = users.filter((user) => user.age == age)
    if(!userDetails){
        res.status(404).json({"message" : "User not found"})
    }
    res.status(200).json({"message" : "User found", "data" : {userDetails} })
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }  
})

app.listen(4040,() => {
    console.log("Server running on port 4040")
})