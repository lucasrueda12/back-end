import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity: Number
        }],
        default: []
    }
});

cartSchema.plugin(mongoosePaginate);
mongoose.set("strictQuery", false);
const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;