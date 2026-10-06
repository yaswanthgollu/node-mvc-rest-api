const User = require('../model/User');

// bcrypt is required for hash and salt the passwords that we come in so we can securely store them in DB.
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) 
    {
        return res.status(400).json({"message": "UserName and Password are required"});
    }
    // check for duplicate username in the db
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate)
    {
        return res.sendStatus(409); //conflict
    }
    try {
        const hashedpwd = await bcrypt.hash(pwd, 10);
        // create and store the new user 
        const result = await User.create({
            "username": user,
            "password": hashedpwd
        });
        
        console.log(result);
        
        res.status(201).json(({'success': `New User ${user} created!`}));
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};