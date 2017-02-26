const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
});

function generateOrderDescription(orderData) {
    return "";
}


function create(orderData) {
    const total = Number(orderData.price).toFixed(2);
    const description = generateOrderDescription(orderData);
    const payment = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://yoururl.com/payment/execute/paypal",
            "cancel_url": "http://yoururl.com/payment/cancel/paypal"
        },
        "transactions": [{
            "amount": {
                "total": total,
                "currency": "USD"
            },
            "description": description,
        }]
    };

    return new Promise((resolve, reject) => {
        paypal.payment.create(payment, function (error, payment) {
            if (error) {
                return reject(error);
            }
            if (payment.payer.payment_method === 'paypal') {
                const paymentId = payment.id;
                let redirectUrl;
                for (let i = 0; i < payment.links.length; i++) {
                    let link = payment.links[i];
                    if (link.method === 'REDIRECT') {
                        redirectUrl = link.href;
                    }
                }
                return resolve({
                    paymentId: paymentId,
                    redirectUrl: redirectUrl,
                });
            }
            reject(new Error('Incorrect payment method.'));
        });
    });
}

function execute(req, res, next) {

}


function cancel(req, res, next) {

}


module.exports.create = create;
module.exports.execute = execute;
module.exports.cancel = cancel;
