import { setBlockType } from 'prosemirror-commands';
import { MenuItem } from './menu-item';

// :: (NodeType, Object) → MenuItem
// Build a menu item for changing the type of the textblock around the
// selection to the given type. Provides `run`, `active`, and `select`
// properties. Others must be given in `options`. `options.attrs` may
// be an object to provide the attributes for the textblock node.
export function blockTypeItem(nodeType, options) {
  let command = setBlockType(nodeType, options.attrs)
  let passedOptions = {
    run: command,
    enable(state) { return command(state) },
    active(state) {
      let {$from, to, node} = state.selection
      if (node) return node.hasMarkup(nodeType, options.attrs)
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs)
    }
  }
  for (let prop in options) passedOptions[prop] = options[prop]
  return new MenuItem(passedOptions)
}
