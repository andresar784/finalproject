var express = require('express');
var router = express.Router();
const Order = require('../model/order');
var router = express.Router();

router.get('/api/orders', (req, res, next) => {
    Order.find()
       .then(documents => {
        console.log(documents)
        res.status(200).json({
            message: 'Orders fetched successfully!',
            orders: documents
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

router.post('/api/test/orders', (req, res, next) => {

    const order = new Order({
        medicine: req.body.medicine,
        indication: req.body.indication
    });

    order.save()
        .then(createdOrder => {
            res.status(201).json({
                message: 'Order added successfully',
                order: createdOrder
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.put('api/test:id', (req, res, next) => {
  const order = new Order({
    _id: req.body.id,
    medicine: req.body.medicine,
    indication: req.body.indication
  });
  Order.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});
    

router.delete("api/test/:id", (req, res, next) => {
    Order.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Order deleted!" });
    });
});

module.exports = router;