const express = require("express");
const app = express();
const port = 8000;
const cors = require('cors')

const cookieParser = require('cookie-parser');
app.use(cookieParser());


const server = app.listen(port, () =>
    console.log(`The server is all fired up on port:${port}`)
);

const io = require('socket.io')(server, { cors: true });

io.on("connection",socket=>{
    console.log(socket.id)
    socket.on("chat_message", (input)=>{
        console.log("got a message",input)
        io.emit("chat_board",input)
    })
})

require('dotenv').config();

require("./configs/mongoose.config")


app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/project.route")(app);

// app.listen(port, () => console.log(`Listening on port: ${port}`));
