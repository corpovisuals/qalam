import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { Plugin } from "prosemirror-state";
import { history } from "prosemirror-history";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import tablePlugins from './table';

let setupStyle = new Plugin({
  props: {
    attributes: {class: "ProseMirror-example-setup-style"}
  }
});

let plugins = [
  keymap(baseKeymap),
  dropCursor(),
  gapCursor(),
  history(),
  setupStyle
]

export default plugins.concat(tablePlugins);
