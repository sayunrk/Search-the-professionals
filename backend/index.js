// initialization 
import app from './app.js';
import mongoose from 'mongoose';

const port = 3000;
//Routes
app.get('/', (_req, res)=>{
    res.send("This is the hompage.");
});

//Starting the server in a port
app.listen(port, ()=>{
    console.log(`Server started at PORT: ${port}`);
});



const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    
  } finally {
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
}
run().catch(console.dir);
