import mongoose from "mongoose";

// check each request for a valid bearer token
const connectToDb =async () => {

  const MONGODB_URI = process.env.MONGODB_URI || '';
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

        if (mongoose.connections[0].readyState) {
          // Use current db connection
          return mongoose.connections[0]
        }
        // Use new db connection
        const opts = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          bufferCommands: false,
          bufferMaxEntries: 0,
          useFindAndModify: false,
          useCreateIndex: true
        };

        return  mongoose.connect(MONGODB_URI, opts).then((mgoose) => {
          return mgoose;
        });


};

export default connectToDb;
