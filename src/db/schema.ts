import {tableSchema} from '@nozbe/watermelondb';

export const productSchema = tableSchema({
  name: 'products',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'price', type: 'number'},
    {name: 'category', type: 'string'},
    {name: 'description', type: 'string'},
    {name: 'image', type: 'string'},
    {name: 'rating_rate', type: 'number'},
    {name: 'rating_count', type: 'number'},
  ],
});
