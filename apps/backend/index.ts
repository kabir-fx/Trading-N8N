import express from "express";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "Healthy"
    })
})

app.post("/signup", (req, res) => {

})

app.post("/signin", (req, res) => {
    
})

app.get("/canvas", (req, res) => {

})

app.post("/canvas", (req, res) => {

})

app.put("/canvas", (req, res) => {

})

app.listen(2099, () => {
    console.log("Backend running on port 2099");
});