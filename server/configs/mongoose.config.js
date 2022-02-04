const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1/MERNproject_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => (console.log('Established a connection to the database'),console.log(process.env.FIRST_SECRET_KEY)))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));
