import Mongoose from "mongoose";

const adminSchema = new Mongoose.Schema({
    "access_code": {
      type: String,
      required: "Access Code is a required field",
    },
    "isLoggedIn": {
      type: Boolean,
      required: "Login Info should not be null",
    },
      "_id": {
        type: Number,
        required: "Id non null"
      }
  }
  );
  
  adminSchema.virtual("id", () => this._id.toHexString());
  adminSchema.set("toJSON", { virtuals: true });
  
  const adminCollection = Mongoose.model("admins", adminSchema);
  
  export default adminCollection;