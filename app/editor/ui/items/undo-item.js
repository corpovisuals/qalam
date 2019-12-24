import { undo } from "prosemirror-history"
import { MenuItem } from '../elements';

export let undoItem = new MenuItem({
  title: "Undo last change",
  run: undo,
  enable: state => undo(state)
})
