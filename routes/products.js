var express = require('express');
var router = express.Router();
var controllers = require('../controllers/products.controller')

const middleware = (req, res, next) => {
    console.log(req.headers)
    next()
}

/* GET users listing. */
router.get('/', middleware, controllers.getAllProducts);
router.post('/', middleware, controllers.createProducts);


module.exports = router;
