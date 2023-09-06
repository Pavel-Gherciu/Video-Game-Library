const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

//registering

router.post("/register", validInfo, async(req,res) =>{
  try{
    //1. destructure the req.body (firstname, lastname, username, email, password)
    const {firstname, lastname, username, email, password} = req.body;

    //2. check if user exist (if exist throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1",[
      email
    ]);

    if(user.rows.length !== 0){
      return res.status(401).json("User already exists");
    }

    //3. bcrypt user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    
    const bcryptPassword = await bcrypt.hash(password, salt);


    //4. enter the new user inside database

    const newUser = await pool.query("INSERT INTO users(user_id, firstname, lastname, username, email, password) VALUES(nextval('users_sequence'), $1, $2, $3, $4, $5) RETURNING *",
    [firstname, lastname, username, email, bcryptPassword])

    //5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
    
  }catch(err){
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//login route

router.post("/login", validInfo, async(req, res) => {
  try {
    //1. destructure de req.body

    const {email, password} = req.body;

    //2. check if user doesnt exist(if not then we throw error)

    const user = await pool.query("SELECT * FROM users WHERE email = $1",[
      email
    ]);

    if(user.rows.length === 0){
      return res.status(401).json("Password or Email is incorrect");
    }

    //3. check if incoming password is the same as the database password

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if(!validPassword){
      return res.status(401).json("Password or Email is incorrect");
    }

    //4. give them the jwt token
    const token = jwtGenerator(user.rows[0].user_id);

    res.json({token});
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
})

router.get("/is-verify", authorization, async (req,res) =>{
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


module.exports = router;
