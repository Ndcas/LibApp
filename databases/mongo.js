const mongoose = require('mongoose');

const url = 'mongodb+srv://hungb2203556:admin@cluster0.51ia1.mongodb.net/LibApp?retryWrites=true&w=majority&appName=Cluster0';

export default function connect() {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    catch (err) {
        console.log('Cannot connect to MongoDB');
        console.log(err);
    }
}