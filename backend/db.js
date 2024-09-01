const mongoose = require('mongoose');
const mongoURI='mongodb+srv://dheeraj1217:Vnr2125@cluster0.xghwhbc.mongodb.net/mernFoodie';

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true });
      console.log("Connected to MongoDB");
  
      // Access the 'foodCategory' collection
      const fetched_data = await mongoose.connection.db.collection("foodItems");
  
      // Fetch data from the collection
      const data = await fetched_data.find({}).toArray();

      // Access the 'foodCategory' collection
      const category_data = await mongoose.connection.db.collection("foodCategory");
  
      // Fetch data from the collection
      const catdata = await category_data.find({}).toArray();
      
      // Log the fetched data
      //console.log(data);
      /* Storing the data in a global logic */
      global.food_items=data
      global.food_category=catdata
      
    } catch (err) {
      console.error("Failed to connect to MongoDB or fetch data", err);
    }
  };

module.exports=mongoDB;