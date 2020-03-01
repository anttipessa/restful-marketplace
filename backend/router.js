// load routers
const UsersRouter = require('./routes/users');
const ItemsRouter = require('./routes/items');
const PaymentRouter = require('./routes/payments');

// Setup Routes
module.exports = function (app) {
    app.use('/api', UsersRouter)
    app.use('/api', ItemsRouter)
    app.use('/api', PaymentRouter)
};