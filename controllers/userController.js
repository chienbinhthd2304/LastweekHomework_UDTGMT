const User = require("../models/user")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.user_get = asyncHandler(async (req, res, next) => {
    res.render("homepage", {
        title: "Application of computer vision"
    });
});

exports.user_signup_get = asyncHandler(async (req, res, next) => {
    res.render("signup_form", {
        title: "Sign up"
    });
});

exports.user_signup_post = [
    // Validate and sanitize fields.
    body("username")
        .isLength({ min: 1 })
        .escape()
        .withMessage("username must be specified."),
    body("email")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("email must be specified."),
    body("password")
        .isLength({ min: 3 })
        .escape()
        .withMessage("password must be specified."),
    body("confirm_password")
        .isLength({ min: 3 })
        .escape()
        .withMessage("confirm password must be specified."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        //const user = new User();
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;
        
        const user = await User.findOne({
            where: {
               email: email 
            }
        })

        var error;
        if (user){
            error = {msg: "email already exists"}
            errors["errors"].push(error);
        }
        if (password !== confirm_password){
            error = {msg: "confirm password is different from password"}
            errors["errors"].push(error);
        }
        
        if (!errors.isEmpty()){
            console.log(typeof errors);
            res.render("signup_form", {
                title: "Sign up",
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password,
                user: user,
                errors: errors.array(),
            });
            
        }
        else {
            user.salt = await bcrypt.genSalt(10);
            user.hash = await bcrypt.hash(password, user.salt);

            await user.save();
            res.send("OK!");
        }
        // if (errors.isEmpty()){
        //     await user.save();
        //     res.send("OK!")
        // }
        //await user.save();
        //res.send("OK!");
    }),
];
exports.user_signin_get = asyncHandler(async (req, res, next) => {
    res.render("signin_form", {
        title: "Sign in"
    });
});

exports.user_signin_post = [
    body("email")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("email must be specified."),
    body("password")
        .isLength({ min: 3 })
        .escape()
        .withMessage("password must be specified."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const checked = true;
        
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({
            where: { 
                email: email 
            },
            raw: true,
            nest: true        
        });

        var error;
        if (user === null){
            error = {msg: "Incorrect email"}
            errors['errors'].push(error);
        }
        else {
            if (! await bcrypt.compare(password, user.hash)){
                error = {msg: "Incorrect password"}
                errors["errors"].push(error);
            }
        }

        if (!errors.isEmpty()){
            res.render("signin_form", {
                title: "Sign in",
                email: email,
                password: password,
                checkvalid: checkValid,
                errors: errors.array() 
            })
        }
        else {
            res.send("Dang nhap thanh cong");
        }
    }),
];
