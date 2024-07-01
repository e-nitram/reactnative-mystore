import {Model} from '@nozbe/watermelondb';
import {field} from '@nozbe/watermelondb/decorators';
export default class ProductModel extends Model {
  static table = 'products';

  @field('title') title!: string;
  @field('price') price!: number;
  @field('category') category!: string;
  @field('description') description!: string;
  @field('image') image!: string;
  @field('rating_rate') rating_rate!: number;
  @field('rating_count') rating_count!: number;
}
