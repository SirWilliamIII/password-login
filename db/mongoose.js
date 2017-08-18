const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const hostNotLocal = 'process.env.MONGODB_URI'
const hostLocal = 'mongodb://localhost:27017/almostDb';

mongoose.connect(hostLocal)

module.exports = {
	mongoose
}