const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(
    process.env.mongoUrl,
    {useNewUrlParser : true, useUnifiedTopology: true} 
)
// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('connected')
// });

const fruitsSchema = new mongoose.Schema({
    ratings : Number,
    name : String,
    review : String
})
const Fruit = mongoose.model("fruits", fruitsSchema)
// const fruit = new Fruit({
//     name : "apple", ratings:7, review:"good"
// })
// fruit.save()
// const other = new Fruit({
//     name : "mango", ratings:10, review:"awesome"
// })
// other.save() 
Fruit.find((err, fruits) => {
    if(err){
        console.log(err)
    } else {
        console.log(fruits)
        fruits.forEach(element => {
            console.log(element.name)
        });
        mongoose.connection.close();
    }
})