import Mongoose from "mongoose";

const sodaSchema = new Mongoose.Schema({
    "name": {
      type: String,
      required: "Name is a required field",
    },
    "description": {
      type: String,
      required: "Description is a required field",
    },
    "cost": {
      type: Number,
      required: "Cola is not free"
    },
    "maxQuantity": {
        type: Number,
        required: "Quantity non null"
      },
      "currQuantity": {
        type: Number,
        required: "Quanity non null"
      },
      "_id": {
        type: Number,
        required: "Id non null"
      }
  }
  );
  
  sodaSchema.virtual("id", () => this._id.toHexString());
  sodaSchema.set("toJSON", { virtuals: true });
  
  const sodaCollection = Mongoose.model("sodas", sodaSchema);
  
  export default sodaCollection;