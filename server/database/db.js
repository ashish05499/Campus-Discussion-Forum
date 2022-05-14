import mongoose from "mongoose";


const Connection = async () => {
    try {
        const URL = `mongodb://ashish:user@campusdiscussionforum-shard-00-00.vvenv.mongodb.net:27017,campusdiscussionforum-shard-00-01.vvenv.mongodb.net:27017,campusdiscussionforum-shard-00-02.vvenv.mongodb.net:27017/PROJECT?ssl=true&replicaSet=atlas-w98oo2-shard-0&authSource=admin&retryWrites=true&w=majority`

        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });

        console.log("Database Connected Successfully");
    }
    catch (error) {
        console.log("Error while connecting to MongoDB", error);
    }
}

export default Connection;