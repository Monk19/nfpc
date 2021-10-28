const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3");
const fileUpload = require("express-fileupload");
const sessions = require("express-session");
const byCrypt = require("bcrypt");
const session = require("express-session");
const port = process.env.PORT || 1919;
app.use(express.static("public"));
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const dealy = 60 * 60 * 0.1;
app.use(
  sessions({
    secret: "xyz/#sdad/das;'dAdsad/sad$",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: dealy },
  })
);

const db = new sqlite3.Database("./db/nfpc.db", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to db");
});
let userMail;
app.post("/Login", function (req, res) {
  console.log(req.session);

  db.get(
    "SELECT * FROM Userlogins where Email_Id=? and Password=?",
    [req.body.Email, req.body.Password],
    function (err, rows) {
      try {
        if (
          rows.Email_Id == req.body.Email &&
          rows.Password == req.body.Password
        ) {
          console.log(rows);
          userMail = rows.Email_Id;
          res.send(true);
          const d = new Date();
          const hrs = d.getHours();
          const mins = d.getMinutes();
          const millsec = d.getMilliseconds();
          const dt = d.getDate();
          const mnth = d.getMonth();
          const yer = d.getFullYear();
          console.log(userMail);
          const updateLogger = `UPDATE Userlogins SET Login_Time=?  Where Email_Id=?`;
          db.run(
            updateLogger,
            [`${hrs}:${mins}:${millsec} ${dt}-${mnth}-${yer}`, userMail],
            () => {
              console.log("updated");
            }
          );
          return;
        }
      } catch (err) {
        console.log(err);
      }
    }
  );
});
app.get("/logout", function (req, res) {
  const d = new Date();
  const hrs = d.getHours();
  const mins = d.getMinutes();
  const millsec = d.getMilliseconds();
  const dt = d.getDate();
  const mnth = d.getMonth();
  const yer = d.getFullYear();
  if (userMail) {
    const updateLogger = `UPDATE Userlogins SET Logout_Time=? Where Email_Id=?`;
    db.run(
      updateLogger,
      [`${hrs}:${mins}:${millsec} ${dt}-${mnth}-${yer}`, userMail],
      () => {
        console.log("updated");
      }
    );
    res.send(true);
  }

  userMail = "";
});

// below is for upload model

app.post("/uploadfile", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }

  const myFile = req.files.file;
  // Use the mv() method to place the file somewhere on your server
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "error" });
    }
    return res.send({
      file: myFile.name,
      path: `/${myFile.name}`,
      ty: myFile.type,
    });
  });
});
// above is for upload model

// upload data in model status in below
app.post("/upload", function (req, res) {
  let date =
    new Date().getDate() +
    "/" +
    (new Date().getMonth() + 1) +
    "/" +
    new Date().getFullYear();

  db.run(
    `insert into Modelstatuslist(Model,Version,Last_Update,Status) values(?,?,?,"inactive")`,
    [req.body.value, req.body.version, date],
    function (err, uploadata) {
      if (err) {
        return console.log(err.message);
      }

      if (uploadata) {
        return console.log(uploadata);
      }
      //  res.send();
    }
  );
});
// upload data in model status in above

// edit data in system thershold in below
app.post("/edit", function (req, res) {
  let data = [req.body.editvalue, req.body.store];
  let sql = `UPDATE SystemThreshold SET Score = ? WHERE Score = ?`;

  db.run(sql, data, function (err, edit) {
    if (err) {
      return console.error(err.message);
    }
    if (edit) {
      return console.log(edit);
    }
  });
});

// edit data in system thershold in above

// system threshold table renedering
app.get("/table", (req, res) => {
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
app.get("/status", (req, res) => {
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
  let bottletypes = [];
  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      filters.push(key);
    }
  }
  if (filters.includes("typeA")) {
    bottletypes.push("typeA");
  } else {
    bottletypes.push("");
  }
  if (filters.includes("typeB")) {
    bottletypes.push("typeB");
  } else {
    bottletypes.push("");
  }
  if (filters.includes("Discoloration")) {
    bottletypes.push("Discoloration");
  } else {
    bottletypes.push("");
  }
  if (filters.includes("Scratches")) {
    bottletypes.push("Scratches");
  } else {
    bottletypes.push("");
  }
  if (filters.includes("Foreign Particles")) {
    bottletypes.push("Foreign Particles");
  } else {
    bottletypes.push("");
  }

  console.log(bottletypes);

  console.log(filters);
  let sqlString = `SELECT Defect_Type,COUNT(*) as count FROM Defectlog WHERE Bottle_Type IN (?,?) AND Defect_Type IN (?,?,?) GROUP BY Defect_Type;`;

  db.all(sqlString, bottletypes, (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);
  });
  console.log(bottletypes);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
