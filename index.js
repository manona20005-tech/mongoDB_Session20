import express from "express";
import { connectToMongoDB } from "./db.js";

const app = express();

app.get("/", async (req, res) => {
  const client = await connectToMongoDB();

  const db = client.db("sample_mflix");

  const movies = db.collection("movies");

  /*
  **************1***************
  
  const data = await movies.find({
    year:2015,
    genres:"Action",runtime:{$gt:120}
  }).toArray();
*/
/*
**************2***************
const data = await movies.find(
  {directors:"Christopher Nolan"})
  .project({
    _id:0,
    title : 1,
    year:1,
    runtime:1
  }).sort({
    year:-1
  }).toArray();
*/

/*
**************3***************
const data = await movies.insertOne({
title: "Ballerina",
year:2026,
runtime:120,
rated:"PG_13",
type : "movie",
genres:["Action","Adventure"],
 num_mflix_comments: 0});

*/

/*
**************4***************
const data = await movies.updateMany({
  year:2014,
  num_mflix_comments:{$gt :5}
},
{
$set:{isPopular:true},
$inc:{ num_mflix_comments:1}
})
*/

/*
**************5***************
const = await movies.deleteMany({
year: { $lt: 1920 },
runtime: { $lt: 30 }
})
*/

//**************6***************
const data = await movies.aggregate([{
 $match: {
year: { $gte: 2010 }}
},
{$group: {
_id: "$year",
totalMovies: { $sum: 1 }, 
averageRuntime: { $avg: "$runtime" }}
},
{$sort: {
 _id: -1}
}
]).toArray();







res.json(data);  
});




app.listen(3000, () => {
  console.log("server started on port 3000");
});


