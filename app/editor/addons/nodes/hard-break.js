import Node from '../types/node';
import { chainCommands } from 'prosemirror-commands';
import { exitCode } from '../../commands';

export default class HardBreak extends Node {
  get name() {
    return 'hard_break';
  }

  get schema() {
    return {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{tag: "br"}],
      toDOM() { return ["br"] }
    }
  }

  keys({ type }) {
    let command = chainCommands(exitCode, (state, dispatch) => {
      dispatch(state.tr.replaceSelectionWith(type.create()).scrollIntoView())
      return true
    });

    return {
      'Mod-Enter': command,
      'Shift-Enter': command,
    }
  }
}
