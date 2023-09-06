const router = require("express").Router();
const pool = require("../db");

router.get("/readall", async(req,res) =>{
  try {
    const allGenres = await pool.query("SELECT * FROM genres");

    res.json(allGenres.rows);
  } catch (err) {
    console.error(err.message)
    req.status(500).json("Server Error");
  }
});



module.exports = router;