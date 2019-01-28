// this uses the "menu" mongo server!!!
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let app = express();
var router = express.Router();
require('./food.model');
require('./customer.model');
require('./order.model')
const FoodDb = mongoose.model('Food');
const CustomerDb = mongoose.model('Customer');
const OrderDb = mongoose.model('Order')

app.use(express.static('app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

const port = 3550;

const server = app.listen(port, '127.0.0.1', () => {
    console.log(`server is live on port ${port}`);
});
mongoose.connect('mongodb://localhost:27017/menu', {useNewUrlParser: true}, (err) => {
    if(!err) {
        console.log('Server is connected to mongo'); 
    }
    else {
        console.log('connection error: ' + JSON.stringify(err, undefined, 2))
    }
});

app.post('/menu', (req, res, next) => {
    console.log("request "+ req);
    const newFood = new FoodDb();
    newFood.Food = req.body.Food;
    newFood.Price = req.body.Price;

    newFood.save((err, results) => {
        if(!err) {
            console.log(results);
            res.json({Food: results});
            //res.send('the food item was saved succesfully!');
        }
        else {
            console.log(err);
        }
    });
});

// app.get('/', (req, res, next) => {
//     FoodDb.find()
//     .exec()
//     .then(docs => {
//         console.log(docs);
//         res.status(200).json(docs)
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     });
// });

app.get('/menu', (req, res) => {
    FoodDb.find({}).exec((err, results) => {
        if(err) {
            res.send("you have an error", err);
            console.log(err); 
        }
        else {
            res.json(results);
        }
    });
});

app.post('/customer', (req, res, next) => {
    console.log("request "+ req);
    const newCustomer = new CustomerDb();
    newCustomer.Name = req.body.Name;

    newCustomer.save((err, results) => {
        if(!err) {
            console.log(results);
            res.json({Customer: results});
        }
        else {
            console.log(err);
        }
    });
});

app.get('/customer', (req, res) => {
    CustomerDb.find({}).exec((err, results) => {
        if(err) {
            res.send("you have an error", err);
            console.log(err); 
        }
        else {
            console.log('someone used the customer api!');
            res.json(results);
        }
    });
});

app.post('/order', (req, res, next) => {
    console.log(req.body.OrderItems[0].ItemName);

    const newOrder = new OrderDb();
    newOrder.OrderNo = req.body.OrderNo;
    newOrder.CustomerId = req.body.CustomerId;
    newOrder.PMethod = req.body.PMethod;
    newOrder.GTotal = req.body.GTotal;
    for(let k in req.body.OrderItems) {
        newOrder.ItemName[k] = req.body.OrderItems[k].ItemName;
        newOrder.ItemId = req.body.OrderItems[k].ItemId;
        newOrder.Price[k] = req.body.OrderItems[k].Price;
        newOrder.Quantity[k] = req.body.OrderItems[k].Quantity;
        newOrder.Total[k] = req.body.OrderItems[k].Total;
    }

    newOrder.save((err, results) => {
        if(!err) {
            console.log(results);
            res.json({Order: results});
            // res.send('the food Order was saved succesfully!');
        }
        else {
            console.log(err);
        }
    });
});