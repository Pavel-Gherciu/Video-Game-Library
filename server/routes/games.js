const router = require("express").Router();
const pool = require("../db");


//CREATE 

router.post("/add", async(req,res) =>{
  try {

    const {game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher} = req.body;

    const allGames = await pool.query(
      "INSERT INTO games(game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher]
      );

    res.json(allGames.rows);
  } catch (err) {
    console.error(err.message)
  }
});



//READ
router.get("/readall", async(req,res) =>{
  try {
    const allGames = await pool.query("select * from games INNER JOIN genres on games.genre_id = genres.genre_id");

    res.json(allGames.rows);
  } catch (err) {
    console.error(err.message)
    req.status(500).json("Server Error");
  }
});

router.get("/readact", async(req,res) => {
  try{
    const allActGames = await pool.query("select * from games INNER JOIN genres on  games.genre_id = genres.genre_id where genres.genre_id = 1;");
    res.json(allActGames.rows);
  }catch(err){
    console.error(err.message);
  }
})

router.get("/readadv", async(req,res) => {
  try{
    const allAdvGames = await pool.query("select * from games INNER JOIN genres on  games.genre_id = genres.genre_id where genres.genre_id = 2;");
    res.json(allAdvGames.rows);
  }catch(err){
    console.error(err.message);
  }
})

router.get("/readrpg", async(req,res) => {
  try{
    const allRPGames = await pool.query("select * from games INNER JOIN genres on  games.genre_id = genres.genre_id where genres.genre_id = 3;");
    res.json(allRPGames.rows);
  }catch(err){
    console.error(err.message);
  }
})

router.get("/readsim", async(req,res) => {
  try{
    const allSimGames = await pool.query("select * from games INNER JOIN genres on  games.genre_id = genres.genre_id where genres.genre_id = 4;");
    res.json(allSimGames.rows);
  }catch(err){
    console.error(err.message);
  }
})

router.get("/readstrat", async(req,res) => {
  try{
    const allStratGames = await pool.query("select * from games INNER JOIN genres on  games.genre_id = genres.genre_id where genres.genre_id = 5;");
    res.json(allStratGames.rows);
  }catch(err){
    console.error(err.message);
  }
})

router.get("/readsport", async(req,res) => {
  try{
    const allSportGames = await pool.query("select * from games INNER JOIN genres on  games.genre_id = genres.genre_id where genres.genre_id = 6;");
    res.json(allSportGames.rows);
  }catch(err){
    console.error(err.message);
  }
})



//DELETE

router.delete("/delete/:id", async(req,res) => {
  try{
    const {id} = req.params;
    const deleteGame = await pool.query("DELETE FROM games WHERE game_id = $1", [id]);
    res.json("Game was deleted!");
  }catch(err){
    console.error(err.message);
  }
})


//UPDATE

router.put("/edit/:id", async(req,res) => {
  try{
    const {id} = req.params;
    const {game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher} = req.body;

    const allGames = await pool.query(
      "UPDATE games SET game_title = $1, game_image_big  = $2, game_image_small = $3, game_logo = $4, release_date = $5, description = $6 ,about = $7, game_url = $8, genre_id = $9, developer = $10, publisher = $11 WHERE game_id = $12",
      [game_title, game_image_big, game_image_small, game_logo, release_date, description ,about, game_url, genre_id, developer, publisher, id]
      );

    res.json("Game was updated!");
  }catch(err){
    console.error(err.message);
  }
})



module.exports = router;
