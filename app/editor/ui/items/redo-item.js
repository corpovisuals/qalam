import { redo } from 'prosemirror-history';
import { MenuItem } from '../elements';

export let redoItem = new MenuItem({
  title: "Redo last undone change",
  run: redo,
  enable: state => redo(state)
})
