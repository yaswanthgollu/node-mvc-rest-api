const User = require("../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and Password are required" });

  const foundUser = await User.findOne({username: user}).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // evalutate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    //create JWTs
    const accessToken = jwt.sign(
    { "UserInfo": { 
        "username": foundUser.username, 
        "roles": roles } 
    }, //user payload
      process.env.ACCESS_TOKEN_SECRET, // secret key
      { expiresIn: "30s" }, // options
    );
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    // attaching RefreshToken to the user in the database
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
