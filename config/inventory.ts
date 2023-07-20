import { Image } from "sanity"

export interface InventoryProduct {
    id: string
    name: string
    image: string
    images: string[]
    categories: string[]
    sizes: string[]
    colors: string[]
    price: number
    currency: string
    description: string
  }
  
  export interface InventoryCategory {
    id: string;
    name: string;
    shortDescription: string;
    categoryName: string;
    image: string;
    images: string[]
  }
  
  export interface SanityProduct extends Omit<InventoryProduct, "images"> {
    _id: string
    _createdAt: Date
    slug: string
    images: Image[]
  }
  
  export interface SanityCategory extends Omit<InventoryCategory, "images"> {
    _id: string
    _createdAt: Date
    slug: string
    images: Image[]
  }

  export interface ImageType {
    images: Image[]
  }

  export interface UserCart {
    _id: string;
    _type: 'userCart';
    userId: string;
    productIds: string[];
  }

  export interface UserWishlist {
    _id: string;
    _type: 'userWishlist';
    userId: string;
    productIds: string[];
  }
  
  