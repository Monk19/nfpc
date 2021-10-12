const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3");

const port = process.env.PORT || 1919;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const db = new sqlite3.Database("./db/nfpcdb.db", (err) => {
  if (err) {
    console.log("here");
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
