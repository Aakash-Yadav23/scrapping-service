import { Document } from "mongoose";

export interface IProduct extends Document{
    title:string;
    description:string;
    price:string;
    images:string[]
    site:string;
    link:string;

}