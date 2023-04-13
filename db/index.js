const mongoose = require('mongoose')


const db = async() => {
    try {
    await mongoose.connect("mongodb+srv://prasanna:prasanna@fs1.uhegkhd.mongodb.net/test");
        console.log('Db Connection Established Successfully')
    } catch (error) {
        console.log('DB Error', error)
    }
}

module.exports = db;