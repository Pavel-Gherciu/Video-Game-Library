const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors())
app.use(express.json()); //req.body

//ROUTES//

//NEW!

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));


//game pages

app.use("/games", require("./routes/games"));

//genres

app.use("/genres", require("./routes/genres"));

//forum posts

app.use("/forum", require("./routes/forum"));

//!!!OLD
//create


//get all


app.get("/frontgames", async(req,res) =>{
  try{
    const allFrontGames = await pool.query("SELECT * FROM frontgames ORDER BY game_id");
    res.json(allFrontGames.rows);
  }catch(err){
    console.error(err.message);
  }
});

//get a 


// update a


//delete a


app.listen(5000, () => {
  console.log("server has started on port 5000")
});