import Model, { attr } from '@ember-data/model';

export default class EmbedFile extends Model {
  @attr() name
  @attr('file') document
  @attr('date') createdAt
  @attr('date') updatedAt
}
