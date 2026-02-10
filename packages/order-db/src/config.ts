export const config = {
  MONGOOSE_URI:
    process.env.MONGO_URI ||
    "mongodb+srv://test:Mongo%40085@cluster0.ozeilc0.mongodb.net/?appName=Cluster0",
  // || "mongodb://localhost:27017/orderdb",
};
