const router = require("express").Router();
const pool = require("../db");


//CREATE 


router.post("/add", async(req,res) =>{
  try {

    const {post_title, post_content, game_topic, post_url,date, time, user_id} = req.body;

    const allPosts = await pool.query(
      "INSERT INTO posts(post_title, post_content, game_topic, post_url, date, time, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [post_title, post_content, game_topic, post_url, date, time, user_id]
      );

    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message)
  }
});

router.post("/addmsg", async(req,res) =>{
  try {

    const {message, post_id, message_date, message_time, user_id} = req.body;

    const allMsg = await pool.query(
      "INSERT INTO messages(message, post_id, message_date, message_time, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [message, post_id, message_date, message_time, user_id]
      );

    res.json(allMsg.rows);
  } catch (err) {
    console.error(err.message)
  }
});



//READ


router.get("/readall", async(req,res) =>{
  try {
    const allPosts = await pool.query("select * from posts INNER JOIN users on posts.user_id = users.user_id;");

    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message)
  }
});


router.get("/readmsg/:id", async(req,res) =>{
  try {
    const {id} = req.params;
    const allPosts = await pool.query("select * from messages INNER JOIN users on messages.user_id = users.user_id INNER JOIN posts on messages.post_id = posts.post_id WHERE messages.post_id = $1 ORDER BY messages.message_id;", [id]);

    res.json(allPosts.rows);
  } catch (err) {
    console.error(err.message)
  }
});



module.exports = router;
