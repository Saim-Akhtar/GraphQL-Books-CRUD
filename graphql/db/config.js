const mongoose = require('mongoose')

// mongoDB connection and settings
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://sami90:' + process.env.MONGODB_ATLAS_PWD + '@cluster0-7y4wq.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

mongoose.Promise = global.Promise
