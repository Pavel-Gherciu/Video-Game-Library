module.exports = (req, res, next) => {
  const {firstname, lastname, username, email, password} = req.body;

  function validEmail(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }

  if(req.path === "/register"){
    if(![firstname, lastname, username, email, password].every(Boolean)){
      return res.status(401).json("Missing credentials");
    }else if (!validEmail(email)){
      return res.status(401).json("Invalid Email");
    }
  }else if (req.path === "/login"){
    if(![email, password].every(Boolean)){
      return res.status(401).json("Missing credentials");
    } else if (!validEmail(email)){
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};