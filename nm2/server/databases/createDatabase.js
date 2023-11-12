import db from "./connection.js"
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode){
    db.exec('DROP TABLE users;');
}

/* DDL */

db.exec(`
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
    );
`);

/* DML - seeding */

const anniPw = await bcrypt.hash("anniCode", 12);
const bibiPw = await bcrypt.hash("bibiCode", 12);
const carlPw = await bcrypt.hash("carlCode", 12);

if(isDeleteMode){
db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ['Anni', 'a@mail.dk', anniPw]);
db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ['Bibi', 'b@mail.dk', bibiPw]);
db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ['Carl', 'c@mail.dk', carlPw]);
}