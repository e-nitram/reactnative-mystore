// src/db/index.ts
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {appSchema} from '@nozbe/watermelondb';
import {productSchema} from './schema';
import Product from './models/ProductModel';

const adapter = new SQLiteAdapter({
  schema: appSchema({
    version: 1,
    tables: [productSchema],
  }),
});

const database = new Database({
  adapter,
  modelClasses: [Product],
});

export default database;
