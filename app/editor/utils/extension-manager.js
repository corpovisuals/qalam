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
}
