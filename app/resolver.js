import Resolver from 'ember-resolver';

export default Resolver.extend({
  adjustRoute(parsedName, type) {
    if (parsedName.fullNameWithoutType.split('/')[0] === 'components') {
      return this;
    }

    parsedName.fullNameWithoutType = 'routes/' + parsedName.fullNameWithoutType;
    parsedName.fullName = type + ':' + parsedName.fullNameWithoutType;
    return this;
  },

  resolveRoute(parsedName) {
    return this._super(parsedName) || this.adjustRoute(parsedName, 'route')._super(parsedName);
  },

  resolveTemplate(parsedName) {
    return this._super(parsedName) || this.adjustRoute(parsedName, 'template')._super(parsedName);
  },

  resolveController(parsedName) {
    return this._super(parsedName) || this.adjustRoute(parsedName, 'controller')._super(parsedName);
  }
});
