const User = require("../model/User");

// const fsPromises = require('fs').promises;
// const path = require('path');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //No content
    
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken: refreshToken}).exec();
    if(!foundUser) 
        {
            res.clearCookie('jwt', {httpOnly: true, sameSite: 'None'});
            return res.sendStatus(204);
         } //No content

    //Delete refresh token in db
    foundUser.refreshToken = '';
    await foundUser.save();
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None'}); //secure: true - only serves on http and https - on production
    res.sendStatus(204); //Successfully logged out

}

module.exports = {handleLogout};