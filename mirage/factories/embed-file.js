import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  name() {
    return faker.lorem.sentences(2);
  },
  document() {
    return { storage: 'sample', id: 'a.pdf' };
  },
  createdAt: faker.date.past,
  updatedAt: faker.date.past
});
