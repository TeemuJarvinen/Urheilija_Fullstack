import mysql from "mysql";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ------------ MYSQL --------------
// Table creation and example data insert

// CREATE TABLE tehtava6urheilijat(
// Id INT(11) NOT NULL AUTO_INCREMENT,
// Etunimi VARCHAR(50) NOT NULL,
// Sukunimi VARCHAR(50) NOT NULL,
// Kutsumanimi VARCHAR(50),
// Syntymavuosi DATE NOT NULL,
// Paino INT,
// Kuva VARCHAR(250),
// Laji VARCHAR(50) NOT NULL,
// Saavutukset VARCHAR(50),
// PRIMARY KEY (Id)
// ) ENGINE=INNODB DEFAULT CHARSET=UTF8 AUTO_INCREMENT=5;

// INSERT INTO tehtava6urheilijat (Etunimi, Sukunimi, Kutsumanimi,Syntymavuosi, Paino, Kuva, Laji, Saavutukset) VALUES
// ('Pertti','Esimerkki', 'Pena', '1986-02-15' , 70, 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'Hiihto', 'SM - Pronssi'),
// ('Erkki','Esimerkki', 'Erkki', '1985-09-12' , 60, 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80', 'Hiihto', 'SM - Hopea'),
// ('Elli','Esimerkki', 'Elli', '2009-12-01' , 50 ,'www.pertinkuva.fi/kuvaPekasta', 'Pesäpallo', '');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tehtava6",
});
con.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

// ------------ Routes --------------
app.get("/urheilijat", (req, res) => {
  con.query("SELECT * FROM tehtava6urheilijat", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.get("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);
  con.query(
    `SELECT * FROM tehtava6urheilijat where id = ${id};`,
    (err, rows) => {
      if (err) throw err;
      res.json(rows[0]);
    }
  );
});

app.post("/urheilijat", (req, res) => {
  const urheilija = req.body;
  con.query("INSERT INTO tehtava6urheilijat SET ?", urheilija, (err, res) => {
    if (err) throw err;
  });
  res.json(urheilija);
});

app.put("/urheilijat/", (req, res) => {
  const id = req.body.id;
  const etunimi = req.body.Etunimi;
  const sukunimi = req.body.Sukunimi;
  const kutsumanimi = req.body.Kutsumanimi;
  const syntymavuosi = req.body.Syntymavuosi;
  const paino = req.body.Paino;
  const kuva = req.body.Kuva;
  const laji = req.body.Laji;
  const saavutukset = req.body.Saavutukset;

  con.query(
    "UPDATE tehtava6urheilijat SET Etunimi = ?, Sukunimi = ?, Kutsumanimi = ?, Syntymavuosi = ?, Paino = ?, Kuva = ?, Laji = ?, Saavutukset = ? Where ID = ?",
    [
      etunimi,
      sukunimi,
      kutsumanimi,
      syntymavuosi,
      paino,
      kuva,
      laji,
      saavutukset,
      id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(`Changed ${result.changedRows} row(s)`);
    }
  );
});

app.delete("/urheilijat/:id", (req, res) => {
  const id = Number(req.params.id);
  con.query(
    "DELETE FROM tehtava6urheilijat WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.send(`Deleted ${result.affectedRows} row(s)`);
    }
  );
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
