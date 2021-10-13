const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3");

const port = process.env.PORT || 1919;
app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const db = new sqlite3.Database("./db/newdb.db", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to db");
});

app.get("/data", (req, res) => {

  const defectTypes_Count = [];
  const sql1 = `SELECT Defecttype,count(*) as count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype`;
  const sql = `SELECT Defecttype,count(*) as count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype`;

  db.all(sql1, ["typeA"], (err, rows) => {
    if (err) {
      console.log(err);
    }
    defectTypes_Count.push(rows);
  });
  db.all(sql, ["typeB"], (err, rows) => {
    if (err) {
      console.log(err);
    }
    defectTypes_Count.push(rows);
    res.send(defectTypes_Count);
  });


});

app.post('/data/filter',(req,res)=>{
  let filters = []
  console.log(filters)
  for(const[key,value] of Object.entries(req.body)){
    if(value){
      filters.push(key)
    }
  }
  if(filters.includes("typeA")&&filters.includes("typeB")&&filters.includes("All")){
      const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=?  GROUP BY Defecttype;`;
      db.all(sql,["typeA","typeB"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
       
      })
  }else if(filters.includes("typeA")&&filters.includes("typeB")&&filters.includes("Scratches")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=?  GROUP BY Defecttype Having Defecttype=?;`;
      db.all(sql,["typeA","typeB","Scratches"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
        
      })
  }else if(filters.includes("typeA")&&filters.includes("typeB")&&filters.includes("Discoloration")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=?  GROUP BY Defecttype Having Defecttype=?;`;
      db.all(sql,["typeA","typeB","Discoloration"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
        
      })
  }
  else if(filters.includes("typeA")&&filters.includes("typeB")&&filters.includes("Foreign Particles")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=? GROUP BY Defecttype Having Defecttype=?;`;
      db.all(sql,["typeA","typeB","Foreign Particles"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
       
      })
  }
  else if(filters.includes("typeA")&&filters.includes("All")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype `;
      db.all(sql,["typeA","All"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
        
      })
  }
  else if(filters.includes("typeA")&&filters.includes("All")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count  FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype;`;
      db.all(sql,["typeA"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
        
      })
  }
  else if(filters.includes("typeA")&&filters.includes("Scratches")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
      db.all(sql,["typeA","Scratches"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
        
      })
  }
  else if(filters.includes("typeA")&&filters.includes("Discoloration")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
      db.all(sql,["typeA","Discoloration"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
       
      })
  }
  else if(filters.includes("typeA")&&filters.includes("Foreign Particles")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
      db.all(sql,["typeA","Foreign Particles"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
       
      })
  }
  else if(filters.includes("typeB")&&filters.includes("All")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype;`;
      db.all(sql,["typeB"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
       
      })
  }
  else if(filters.includes("typeB")&&filters.includes("Scratches")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
      db.all(sql,["typeB","Scratches"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
        
      })
  }
  else if(filters.includes("typeB")&&filters.includes("Discoloration")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
      db.all(sql,["typeB","Discoloration"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
       
      })
  }
  else if(filters.includes("typeB")&&filters.includes("Foreign Particles")){
    const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
      db.all(sql,["typeB","Foreign Particles"],(err,rows)=>{
        if(err){
          console.log(err)
        }
        res.send(rows)
        
      })
  }
  // if(filters.includes("fromDate")&&filters.includes("toDate")&&filters.includes("typeA")&&filters.includes("All")){
  
  //   db.all(sql1,["typeA"],(err,rows)=>{
  //     if(err){
  //       console.log(err)
  //     }
  //     res.send(rows)
  //   })
  // }
 
})

// db.all(`SELECT * FROM Defectlog Where Sno=?;`,[1000], (err, rows) => {
//   const t01 = performance.now()
//   if (err) {
//     console.log(err);
//   }
//   rows.forEach((row) => {
//   // console.log(row)
//   });
//   const t01end = performance.now()

//   console.log(t01end-t01)

app.listen(port, () => {
  console.log("Server is running at http://localhost:3000/");
});
