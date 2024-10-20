import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "../interface/Product";

const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        // unique: true,
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
    },
    product: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    highestPrice: {
        type: String,
    },
    lowestPrice: {
        type: String,
    }
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
