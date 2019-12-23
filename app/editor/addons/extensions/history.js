import Extension from '../types/extension';
import { undo, redo } from 'prosemirror-history';

export default class History extends Extension {
  get name() {
    return 'history';
  }

  keys() {
    return {
      'Mod-z': undo,
      'Mod-y': redo,
      'Shift-Mod-z': redo,
    }
  }
}
