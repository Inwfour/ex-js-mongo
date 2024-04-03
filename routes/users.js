var express = require('express');
var multer = require('multer')
var router = express.Router();
const userSchema = require('../models/users.model')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {

    // let user = await userSchema.find({})

    let user = await userSchema.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "user_id",
          as: "products"
        }
      }
    ])

    res.send({
      status: 200,
      message: "success",
      data: user
    })
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

router.post('/', upload.single('profile'), async function (req, res, next) {
  try {

    let user = new userSchema({
      name: req.body.name,
      age: req.body.age
    })

    await user.save()

    res.send({
      status: 200,
      message: "success",
      data: user
    })
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

router.put('/:id', async function (req, res, next) {
  try {

    let user = await userSchema.findByIdAndUpdate(req.params.id, req.body)

    res.send({
      status: 200,
      message: "success",
      data: user
    })
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

router.delete('/:id', async function (req, res, next) {
  try {

    let user = await userSchema.findByIdAndDelete(req.params.id)

    res.send({
      status: 200,
      message: "success",
      data: user
    })
  } catch (error) {
    res.status(500).send(error.toString())
  }
});

module.exports = router;
