var express = require('express');
var router = express.Router();

const user_controller = require("../controllers/userController")
/* GET users listing. */
router.get('/', user_controller.user_get);

router.get('/signup', user_controller.user_signup_get);

router.post('/signup', user_controller.user_signup_post);

router.get('/signin', user_controller.user_signin_get);

router.post('/signin', user_controller.user_signin_post);

module.exports = router;
