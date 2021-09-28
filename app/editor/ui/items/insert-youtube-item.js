import { MenuItem, TextField, openPrompt } from '../elements';
import { NodeSelection } from 'prosemirror-state';

function canInsert(state, nodeType) {
  let $from = state.selection.$from
  for (let d = $from.depth; d >= 0; d--) {
    let index = $from.index(d)
    if ($from.node(d).canReplaceWith(index, index, nodeType)) return true
  }
  return false
}

export function insertYoutubeItem(nodeType, attrs) {
  let passedOptions = {
    enable(state) { return canInsert(state, nodeType) },
    run(state, _, view) {
      let attrs = null;

      if (state.selection instanceof NodeSelection && state.selection.node.type == nodeType)
        attrs = state.selection.node.attrs

      openPrompt({
        title: "Insert Youtube Link",
        fields: {
          src: new TextField({label: "Link", required: true, value: attrs && attrs.src}),
          title: new TextField({label: "Title", value: attrs && attrs.title}),
        },
        callback(attrs) {
          let cAttrs = {
            src: attrs.src.replace('watch?v=', 'embed/'),
            style: 'width: 100%; aspect-ratio: 1200 / 660; border: 0;',
            allow: 'autoplay',
            allowfullscreen: 'true'
          }

          view.dispatch(
            view.state.tr.replaceSelectionWith(
              nodeType.createAndFill({ ...attrs, ...cAttrs })
            )
          )
          view.focus()
        }
      })
    }
  };

  for (let prop in attrs) passedOptions[prop] = attrs[prop];
  return new MenuItem(passedOptions);
}
