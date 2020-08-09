import { Factory } from 'ember-cli-mirage';
import faker from 'faker';
import randomImage from '../helpers/image-data';

export default Factory.extend({
  caption() {
    return faker.lorem.sentences(2);
  },
  credit() {
    return `${faker.name.firstName()} ${faker.name.lastName()}`;
  },
  image() {
    return randomImage({ size: 400 })
  },
  createdAt: faker.date.past,
  updatedAt: faker.date.past
});
