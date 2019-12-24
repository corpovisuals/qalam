import { cmdItem } from './cmd-item';

export function wrapListItem(commands) {
  return (nodeType, options) => {
    return cmdItem(commands[nodeType.name](options.attrs), options);
  }
}
