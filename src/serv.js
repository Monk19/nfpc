const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3");
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 1919;
app.use(express.static('public'))
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);



const db = new sqlite3.Database("./db/nfpc.db", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to db");
});

app.post('/Login', function (req, res) {
  db.get('SELECT * FROM Userlogins where Email_Id=? and Password=?', [req.body.Email,req.body.Password], function(err, rows){ 

    try{
      if(rows.Email_Id == req.body.Email && rows.Password==req.body.Password){
        console.log(rows)
        res.send(true)
        return
      }
    }catch(err){
      console.log(err)
    } 

})
})


// below is for upload model

app.post('/uploadfile', (req, res) => {
  
  if (!req.files) { 
      return res.status(500).send({ msg: "file is not found" })
  }

  const myFile = req.files.file;
  // Use the mv() method to place the file somewhere on your server
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
      if (err) {
          console.log(err)
          return res.status(500).send({ msg: "error" });
      }
      return res.send({ file: myFile.name, path: `/${myFile.name}`, ty: myFile.type });
  });
}) 
// above is for upload model

// upload data in model status in below
app.post('/upload', function (req,res) {

  let date = new Date().getDate() +  "/" +    (new Date().getMonth() + 1) +    "/" +    new Date().getFullYear()
  
  db.run(`insert into Modelstatuslist(Model,Version,Last_Update,Status) values(?,?,?,"inactive")`,[req.body.value,req.body.version,date], function(err,uploadata) {
    if (err) {
      return console.log(err.message);
    }
    
    if(uploadata){
   return console.log(uploadata);
    }
  //  res.send();
  });
  });
  // upload data in model status in above

  
// edit data in system thershold in below
app.post('/edit' , function(req,res){
  let data = [req.body.editvalue,req.body.store];
  let sql = `UPDATE SystemThreshold SET Score = ? WHERE Score = ?`;

    db.run(sql, data, function(err,edit){
    if (err) {
      return console.error(err.message);
    }
    if(edit)
    {return console.log(edit);}
  
  });
  });
  
  // edit data in system thershold in above

// system threshold table renedering
app.get('/table',  (req, res) => {
  let sql = `SELECT * from SystemThreshold`;
  // let Sno = ;
  // console.log(sql);
  
  // first row only
  db.all(sql, (err, rows) => {
    if (err) {
      throw err;
    }
  res.send(rows);
  });
  });
// system threshold table renedering


//model status table rendering
app.get('/status',  (req, res) => {
  let sql = `SELECT * from Modelstatuslist`;
  
  // first row only
  db.all(sql, (err, rowm) => {
    if (err) {
      
      throw err;
    }
  
    res.send(rowm);
    
  });
  });
//model status table rendering

app.get("/data", (req, res) => {
  const defectTypes_Count = [];
  const sql1 = `SELECT Defect_Type,count(*) as count FROM Defectlog WHERE Bottle_Type=? GROUP BY Defect_Type`;
  const sql = `SELECT Defect_Type,count(*) as count FROM Defectlog WHERE Bottle_Type=? GROUP BY Defect_Type`;

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
app.post("/data/filter", (req, res) => {
  let filters = [];
  let bottletypes = []
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      filters.push(key);
    } 
  }
  if(filters.includes("typeA")){
    bottletypes.push("typeA")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("typeB")){
    bottletypes.push("typeB")
  }else{
    bottletypes.push("")
  }
   if(filters.includes("Discoloration")){
    bottletypes.push("Discoloration")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Scratches")){
    bottletypes.push("Scratches")
  }else{
    bottletypes.push("")
  }
  if(filters.includes("Foreign Particles")){
    bottletypes.push('Foreign Particles')
  }else{
    bottletypes.push("")
  }



  console.log(bottletypes)

  console.log(filters);
  let sqlString = `SELECT Defect_Type,COUNT(*) as count FROM Defectlog WHERE Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?) GROUP BY Defect_Type;`

  db.all(sqlString,bottletypes,(err,rows)=>{
    if(err){
      console.log(err)
    }
    res.send(rows)
  })
  console.log(bottletypes)

  // if (JSON.stringify(filters) == JSON.stringify(["typeA", "typeB", "All"])) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=?  GROUP BY Defecttype;`;
  //   db.all(sql, ["typeA", "typeB"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) == JSON.stringify(["typeA", "typeB", "Scratches"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=?  GROUP BY Defecttype Having Defecttype=?;`;
  //   db.all(sql, ["typeA", "typeB", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //   JSON.stringify(["typeA", "typeB", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=?  GROUP BY Defecttype Having Defecttype=?;`;
  //   db.all(sql, ["typeA", "typeB", "Discoloration"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //   JSON.stringify(["typeA", "typeB", "Foreign Particles"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? OR Bottletype=? GROUP BY Defecttype Having Defecttype=?;`;
  //   db.all(sql, ["typeA", "typeB", "Foreign Particles"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (JSON.stringify(filters) == JSON.stringify(["typeA", "All"])) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype `;
  //   db.all(sql, ["typeA", "All"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //   JSON.stringify(["typeA", "typeB", "Foreign Particles"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count  FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype;`;
  //   db.all(sql, ["typeA"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "typeB", "Foreign Particles", "Scratches"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "typeB", "Scratches", "Foreign Particles"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? or Bottletype=?GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(
  //     sql,
  //     ["typeA", "typeB", "Foreign Particles", "Scratches"],
  //     (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.send(rows);
  //     }
  //   );
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "typeB", "Discoloration", "Scratches"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "typeB", "Scratches", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? or Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(
  //     sql,
  //     ["typeA", "typeB", "Discoloration", "Scratches"],
  //     (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.send(rows);
  //     }
  //   );
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Discoloration",
  //       "Foreign Particles",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "typeB", "Foreign Particles", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? or Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(
  //     sql,
  //     ["typeA", "typeB", "Discoloration", "Scratches"],
  //     (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.send(rows);
  //     }
  //   );
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Discoloration",
  //       "Foreign Particles",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Discoloration",
  //       "Foreign Particles",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Scratches",
  //       "Foreign Particles",
  //       "Discoloration",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Scratches",
  //       "Discoloration",
  //       "Foreign Particles",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Discoloration",
  //       "Scratches",
  //       "Foreign Particles",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "typeB",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //       "All",
  //     ]) ||
  //   JSON.stringify(filters) == JSON.stringify(["typeA", , "typeB", "All"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? or Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=? or Defecttype=?;`;
  //   db.all(
  //     sql,
  //     ["typeA", "typeB", "Discoloration", "Scratches", "Foreign Particles"],
  //     (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.send(rows);
  //     }
  //   );
  // } else if (
  //   JSON.stringify(filters) == JSON.stringify(["typeA", "Scratches"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
  //   db.all(sql, ["typeA", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) == JSON.stringify(["typeA", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
  //   db.all(sql, ["typeA", "Discoloration"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) == JSON.stringify(["typeA", "Foreign Particles"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
  //   db.all(sql, ["typeA", "Foreign Particles"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "Foreign Particles", "Scratches"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "Scratches", "Foreign Particles"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(sql, ["typeA", "Foreign Particles", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "Discoloration", "Scratches"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "Scratches", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(sql, ["typeA", "Discoloration", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "Discoloration", "Foreign Particles"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeA", "Foreign Particles", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(sql, ["typeA", "Discoloration", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Discoloration",
  //       "Foreign Particles",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Discoloration",
  //       "Foreign Particles",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Scratches",
  //       "Foreign Particles",
  //       "Discoloration",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Scratches",
  //       "Discoloration",
  //       "Foreign Particles",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Discoloration",
  //       "Scratches",
  //       "Foreign Particles",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeA",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //       "All",
  //     ]) ||
  //   JSON.stringify(filters) == JSON.stringify(["typeA", "All"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=? or Defecttype=?;`;
  //   db.all(
  //     sql,
  //     ["typeA", "Discoloration", "Scratches", "Foreign Particles"],
  //     (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.send(rows);
  //     }
  //   );
  // } else if (JSON.stringify(filters) == JSON.stringify(["typeB", "All"])) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype;`;
  //   db.all(sql, ["typeB"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) == JSON.stringify(["typeB", "Scratches"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
  //   db.all(sql, ["typeB", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) == JSON.stringify(["typeB", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
  //   db.all(sql, ["typeB", "Discoloration"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) == JSON.stringify(["typeB", "Foreign Particles"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=?;`;
  //   db.all(sql, ["typeB", "Foreign Particles"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeB", "Foreign Particles", "Scratches"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeB", "Scratches", "Foreign Particles"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(sql, ["typeA", "Foreign Particles", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeB", "Discoloration", "Scratches"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeB", "Scratches", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(sql, ["typeB", "Discoloration", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeB", "Discoloration", "Foreign Particles"]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify(["typeB", "Foreign Particles", "Discoloration"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=?;`;
  //   db.all(sql, ["typeB", "Discoloration", "Scratches"], (err, rows) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.send(rows);
  //   });
  // } else if (
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Discoloration",
  //       "Foreign Particles",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Discoloration",
  //       "Foreign Particles",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Scratches",
  //       "Foreign Particles",
  //       "Discoloration",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Scratches",
  //       "Discoloration",
  //       "Foreign Particles",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Discoloration",
  //       "Scratches",
  //       "Foreign Particles",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //     ]) ||
  //   JSON.stringify(filters) ==
  //     JSON.stringify([
  //       "typeB",
  //       "Foreign Particles",
  //       "Discoloration",
  //       "Scratches",
  //       "All",
  //     ]) ||
  //   JSON.stringify(filters) == JSON.stringify(["typeB", "All"])
  // ) {
  //   const sql = `SELECT Defecttype ,COUNT(*) AS count FROM Defectlog WHERE Bottletype=? GROUP BY Defecttype HAVING Defecttype=? or Defecttype=? or Defecttype=?;`;
  //   db.all(
  //     sql,
  //     ["typeB", "Discoloration", "Scratches", "Foreign Particles"],
  //     (err, rows) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       res.send(rows);
  //     }
  //   );
  // }
  // if(filters.includes("fromDate")&&filters.includes("toDate")&&filters.includes("typeA")&&filters.includes("All")){

  //   db.all(sql1,["typeA"],(err,rows)=>{
  //     if(err){
  //       console.log(err)
  //     }
  //     res.send(rows)
  //   })
  // }
});

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
  console.log(`Server is running at http://localhost:${port}`);
})
