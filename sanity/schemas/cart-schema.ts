import { defineType } from "sanity";

export const userCart = defineType({
  name: 'userCart',
  title: 'User Cart',
  type: 'document',
  fields: [
    {
      name: 'userId',
      title: 'User ID',
      type: 'string' // Assuming user ID is a string
    },
    {
      name: 'productIds',
      title: 'Product IDs',
      type: 'array',
      of: [
        {
          type: 'string',
        }
      ]
    }
  ]
});
