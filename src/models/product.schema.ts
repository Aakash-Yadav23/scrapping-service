import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "../interface/Product";

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    site: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
