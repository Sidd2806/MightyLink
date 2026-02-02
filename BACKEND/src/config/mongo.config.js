import mongoose from "mongoose"


const connectDB = async ()=>{
   try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
} catch (err) {
  console.error("❌ MongoDB error name:", err.name);
  console.error("❌ MongoDB error message:", err.message);
  console.error("❌ MongoDB error code:", err.code);
  throw err;
}

}
export default connectDB;