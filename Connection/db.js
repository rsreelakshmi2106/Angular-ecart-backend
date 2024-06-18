const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Connection Established Successfully");
})
.catch((err)=>{
    console.log("MongoDB Connection Error : "+err);
})