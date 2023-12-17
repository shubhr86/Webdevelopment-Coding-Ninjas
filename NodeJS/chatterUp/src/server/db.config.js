import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const baseUrl = process.env.MONGODB || '0.0.0.0:27017';

const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(`mongodb://${baseUrl}/chatterApp`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected using mongoose");
    } catch (err) {
        console.log(err);
    }
}

export default connectUsingMongoose;