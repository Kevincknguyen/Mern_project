const UserController=require("../controllers/user.controller")
const {authenticate}=require('../configs/jwt.config')

module.exports=app=>{
    app.get("/api/users",UserController.allUsers)

    app.post("/api/users/register",UserController.register)
    app.get("/api/users/:username",UserController.oneUser)
    app.delete("api/users/:username", UserController.deleteUser)

    app.get('/secret',UserController.test)
    app.post("/api/users/account/login",UserController.login)
    app.get("/api/users/account/logout",UserController.logout)
    
    app.put("/api/users/:username",UserController.editUser)
}