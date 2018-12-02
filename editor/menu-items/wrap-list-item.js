import { wrapInList } from 'prosemirror-schema-list';
import { cmdItem } from './cmd-item';

export function wrapListItem(nodeType, options) {
  return cmdItem(wrapInList(nodeType, options.attrs), options)
}
