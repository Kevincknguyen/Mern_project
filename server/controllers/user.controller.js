const User = require("../models/user.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");



module.exports.allUsers = (req, res) => {
    User.find().sort({ username: 1 })
        .then(allUser => res.json(allUser))
        .catch(err => res.status(400).json(err))
}

module.exports.oneUser=(req,res)=>{
    User.findOne({username: req.params.username})
        .then(oneUser=>res.json(oneUser))
        .catch(err=>res.status(400).json(err))
}

// module.exports.register = (req, res) => {
//     User.create(req.body)
//         .then(oneUser=>res.json(oneUser))
//         .catch(err=>res.status(400).json(err))
// }

module.exports.register = (req, res) => {
    User.create(req.body)
        .then(oneUser=>{
            const userToken=jwt.sign({
                id:oneUser._id,
                username:oneUser.username
            },process.env.FIRST_SECRET_KEY);
        res.cookie("usertoken",userToken).json({msg:"success!", user:oneUser, usertoken:userToken})
    })
        .catch(err=>res.status(400).json(err))
}




module.exports.test = (req, res) => {
    res.json({ message: process.env.FIRST_SECRET_KEY })
}




module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}


module.exports.login = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
        console.log("user not found")
        return res.sendStatus(400);
    }
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        console.log("password mismatch")
        return res.sendStatus(400);
    }
    const userToken = jwt.sign({
        id: user._id,
        username:user.username
    }, process.env.FIRST_SECRET_KEY);
    res.cookie("usertoken", userToken).json({ msg: "success!", usertoken:userToken});

}


module.exports.deleteUser=(req,res)=>{
    User.deleteOne({username:req.params.username})
    .then(deleteUser=>res.json(deleteUser))
    .catch(err=>res.status(400).json(err))
}


module.exports.editUser=(req,res)=>{
    User.findOneAndUpdate({username: req.params.username},req.body,{new:true, runValidators:true})
        .then(editUser=>res.json(editUser))
        .catch(err=>res.status(400).json(err))
}