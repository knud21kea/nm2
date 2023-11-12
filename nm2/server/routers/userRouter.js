import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";
import bcrypt from "bcrypt";
import { resetPassword } from "../util/nodemailer.js";

router.get("/user/recovery", async (req, res) => {
    const targetEmail = req.query.email;
    const checkIfUser = await db.get("SELECT * FROM users WHERE email = ?", [targetEmail]);

    if (!checkIfUser) {
        return res.status(404).send({ message: "Email not recognized" });
    }
    resetPassword(targetEmail).catch(console.error);

    res.status(200).send({ message: "Recovery mail sent" })

})

router.get("/users/logout", async (req, res) => {
    req.session.destroy(() => {
        res.status(200).send({ message: "Logged out." });
    })

});

router.post("/users/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await db.get("SELECT * FROM users WHERE email = ?;", [email]);

    if (!user) {
        return res.status(404).send({ message: "User not recognized." });
    }

    const userpass = await bcrypt.compare(password, user.password);

    if (!userpass) {
        return res.status(400).send({ message: "Invalid password" });
    }

    req.session.user = {
        name: user.name, email
    }

    res.status(200).send(req.session.user);
})

router.post("/users/createuser", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const checkForExistingName = await db.get("SELECT * FROM users WHERE name=?", [name]);
    const checkForExistingEmail = await db.get("SELECT * FROM users WHERE email=?", [email]);

    if (!checkForExistingName && !checkForExistingEmail) {

        const hashedPw = await bcrypt.hash(password, 12);

        db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPw]);
        return res.status(201).send({ message: `User: ${name} successfully created.` })
    }
    else {
        return res.status(404).send({ message: "Name or Email already in use." })
    }
})

export default router;
