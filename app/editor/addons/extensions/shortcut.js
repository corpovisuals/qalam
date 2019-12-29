import Extension from '../types/extension';
import { joinUp, joinDown, lift, selectParentNode } from '../../commands';
import { undoInputRule } from 'prosemirror-inputrules';

export default class Shortcut extends Extension {
  get name() {
    return 'shortcut';
  }

  keys() {
    return {
      'Backspace': undoInputRule,
      'Alt-ArrowUp': joinUp,
      'Alt-ArrowDown': joinDown,
      'Mod-BracketLeft': lift,
      'Escape': selectParentNode
    }
  }
}
