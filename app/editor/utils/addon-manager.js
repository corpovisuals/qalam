import { keymap } from 'prosemirror-keymap';

export default class AddonManager {
  constructor(addons = []) {
    this.addons = addons;
  }

  get nodes() {
    return this.addons
      .filter(addon => addon.type === 'node')
      .reduce((nodes, { name, schema }) => ({
        ...nodes,
        [name]: schema
      }), {});
  }

  get marks() {
    return this.addons
      .filter(addon => addon.type === 'mark')
      .reduce((marks, { name, schema }) => ({
        ...marks,
        [name]: schema
      }), {});
  }

  get plugins() {
    return this.addons
      .filter(addon => addon.plugins)
      .reduce((allPlugins, { plugins }) => ([
        ...allPlugins,
        ...plugins,
      ]), []);
  }

  keymaps({ schema }) {
    const extensionKeymaps = this.addons
      .filter(addon => ['extension'].includes(addon.type))
      .filter(addon => addon.keys)
      .map(addon => addon.keys({ schema }));

    const nodeMarkKeymaps = this.addons
      .filter(addon => ['node', 'mark'].includes(addon.type))
      .filter(addon => addon.keys)
      .map(addon => addon.keys({
        type: schema[`${addon.type}s`][addon.name],
        schema,
      }));

    return [
      ...extensionKeymaps,
      ...nodeMarkKeymaps,
    ].map(keys => keymap(keys));
  }

  inputRules({ schema }) {
    const extensionInputRules = this.addons
      .filter(addon => ['extension'].includes(addon.type))
      .filter(addon => addon.inputRules)
      .map(addon => addon.inputRules({ schema }));

    const nodeMarkInputRules = this.addons
      .filter(addon => ['node', 'mark'].includes(addon.type))
      .filter(addon => addon.inputRules)
      .map(addon => addon.inputRules({
        type: schema[`${addon.type}s`][addon.name],
        schema,
      }));

    return [
      ...extensionInputRules,
      ...nodeMarkInputRules,
    ].reduce((allInputRules, inputRules) => ([
      ...allInputRules,
      ...inputRules,
    ]), []);
  }

  commands({ schema }) {
    return this.addons
      .filter(addon => addon.commands)
      .reduce((allCommands, addon) => {
        const { name, type } = addon;
        const commands = {};
        const value = addon.commands({
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
