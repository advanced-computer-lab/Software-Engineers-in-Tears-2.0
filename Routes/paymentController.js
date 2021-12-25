require("dotenv").config({ path: "./config.env" });
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.charge = (req, res) => {

    console.log(req.body.token);
    const token = req.body.token;
    const amount = req.body.amount;

    stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer =>{
        stripe.charges.create({
            amount: amount*100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        })
    }).then(result =>{
        res.status(200).send(result);
    }).catch(err =>{
        console.log(err);
        res.status(500).send(err);
    });
}