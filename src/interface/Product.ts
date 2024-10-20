import { Document } from "mongoose";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: string;
    highestPrice?:string;
    lowestPrice?:string;
    images: string[]
    site: string;
    link: string;
    category: string;
    product: string;

}