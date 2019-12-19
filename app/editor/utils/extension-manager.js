export default class ExtensionManager {
  constructor(extensions = []) {
    this.extensions = extensions;
  }

  get nodes() {
    return this.extensions
      .filter(extension => extension.type === 'node')
      .reduce((nodes, { name, schema }) => ({
        ...nodes,
        [name]: schema
      }), {});
  }

  get marks() {
    return this.extensions
      .filter(extension => extension.type === 'mark')
      .reduce((marks, { name, schema }) => ({
        ...marks,
        [name]: schema
      }), {});
  }

  commands({ schema }) {
    return this.extensions
      .filter(extension => extension.commands)
      .reduce((allCommands, extension) => {
        const { name, type } = extension;
        const commands = {};
        const value = extension.commands({
          schema,
          ...['node', 'mark'].includes(type) ? {
            type: schema[`${type}s`][name],
          } : {},
        });

        const apply = (cb, attrs) => {
          return cb(attrs);
        };

        const handle = (_name, _value) => {
          if (Array.isArray(_value)) {
            commands[_name] = attrs => _value.forEach(callback => apply(callback, attrs));
          } else if (typeof _value === 'function') {
            commands[_name] = attrs => apply(_value, attrs);
          }
        };

        if (typeof value === 'object') {
          Object.entries(value).forEach(([commandName, commandValue]) => {
            handle(commandName, commandValue);
          })
        } else {
          handle(name, value);
        }

        return {
          ...allCommands,
          ...commands,
        };
      }, {});
  }
}
