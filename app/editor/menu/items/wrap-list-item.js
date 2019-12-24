import { wrapInList } from '../../commands';
import { cmdItem } from './cmd-item';

export function wrapListItem(nodeType, options) {
  return cmdItem(wrapInList(nodeType, options.attrs), options)
}
