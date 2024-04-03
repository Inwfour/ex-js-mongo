var productSchema = require('../models/products.model')

const controllers = {
    getAllProducts: async (req, res, next) => {
        try {

            let products = await productSchema.find({})

            res.send({
                status: 200,
                message: "success",
                data: products
            })
        } catch (error) {
            res.status(500).send(error.toString())
        }
    },
    createProducts: async (req, res, next) => {
        try {

            let products = new productSchema({
                user_id: req.body.user_id,
                product_name: req.body.product_name,
                total: req.body.total
              })
          
              await products.save()

            res.send({
                status: 200,
                message: "success",
                data: products
            })
        } catch (error) {
            res.status(500).send(error.toString())
        }
    }
}

module.exports = controllers