const express = require("express");
const router = express.Router();
const knex = require("../knexConfig.js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { name, email, phone, address, password } = req.body;

    // TODO: Pretend we validated the information
    // TODO: make sure email is unique!
    
    try {
        // Form is valid, save user info to Database?
        // TODO: hashPassword using bcrypt -> bcrypt.hash(password)
        const newUserIds = await knex("users")
            .insert({
                name: name,
                email: email,
                phone: phone,
                address: address,
                password: password
            });
        
        // Responds with new user (201 Created)
        const newUserId = newUserIds[0];
        res.status(201).json({
            message: "User created successfully",
            userId: newUserId
        })  
    } catch (error) {
        res.status(500).json({
            message: "Unable to create user",
            error
        })
    }
});

router.post("/login", async (req, res) => {
    // Validate required fields
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Validate user credentials
    const users = await knex("users")
        .where({ email: req.body.email });
    
    if (users.length === 0) {
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const user = users[0];

    // TODO: use bcrypt again -> bcrypt.compare(req.body.password, user.password)
    if (user.password !== req.body.password) {
        // If invalid: Respond with Invalid Credentials (401)
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }
    
    const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);

    return res.status(200).json({
        message: "User logged in successfully",
        token: token
    })
});

router.get("/profile", (req, res) => {

    /*
    - GOAL: See the specific user information of the user that is logged in
        - Include JWT in Authorization header!
    */

    // req.headers.authorization = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2NjkzMjAwMjR9.7U9ShrAHCI2j4aLjdqpLI2870Nkmt6SJQ4lN29h5CNU"

    if (!req.headers.authorization) {
        return res.status(400).json({
            message: "Bearer token required"
        })
    }

    const bearerTokenArray = req.headers.authorization.split(" ");
    if (bearerTokenArray.length !== 2) {
        return res.status(400).json({
            message: "Bearer token required"
        })
    }

    const token = bearerTokenArray[1];
    // Verify the JWT
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
            // if not valid -> send an error response back (401)
            return res.status(401).json({
                message: "Invalid token"
            })
        }

        // - if valid JWT
            // - in JWT payload -> grab the user id
            // - using that user id -> get profile information for that user! (200) 
        const users = await knex("users")
            .where({ id: decoded.user_id });

        if (users.length === 0) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const user = users[0];
        delete user.password;
        delete user.id;

        return res.json(user);
    });
});

module.exports = router;