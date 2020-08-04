import Model, { attr } from '@ember-data/model';

export default class EmbedPhoto extends Model {
  @attr() caption
  @attr() credit
  @attr('file') image
  @attr('date') createdAt
  @attr('date') updatedAt
}
