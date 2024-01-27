const mongoose = require('mongoose');

const connection = async () => {
      try {
            await mongoose.connect(process.env.mongoURL)
            console.log('MongoDB database is connected')
      } catch (error) {
            console.log('MongoDB database connection failed')           
      }
}

module.exports = {
      connection
}