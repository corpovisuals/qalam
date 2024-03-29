import { Plugin } from 'prosemirror-state';

import {
  MenuBarView,
  MenuItem,
  Dropdown,
  DropdownSubmenu
} from './elements';

import {
  wrapItem,
  blockTypeItem,
  joinUpItem,
  liftItem,
  undoItem,
  redoItem,
  linkItem,
  styleItem,
  insertImageItem,
  insertFileItem,
  insertYoutubeItem,
  markItem,
  wrapListItem
} from './items';

import { icons } from './icons';

// :: (Object) → Plugin
// A plugin that will place a menu bar above the editor. Note that
// this involves wrapping the editor in an additional `<div>`.
//
//   options::-
//   Supports the following options:
//
//     content:: [[MenuElement]]
//     Provides the content of the menu, as a nested array to be
//     passed to `renderGrouped`.
//
//     floating:: ?bool
//     Determines whether the menu floats, i.e. whether it sticks to
//     the top of the viewport when the editor is partially scrolled
//     out of view.
export function menuBar(options) {
  return new Plugin({
    view(editorView) { return new MenuBarView(editorView, options) }
  })
}

export function buildMenuItems(schema, addons, options) {
  let r = {}, type;
  let commands = addons.commands({ schema });

  const apply = (cb, type, options) => {
    return cb(commands)(type, options);
  }

  /* eslint-disable no-cond-assign */

  if (type = schema.marks.strong) {
    r.toggleStrong = apply(markItem, type, {title: 'Toggle bold', icon: icons.strong});
  }

  if (type = schema.marks.em) {
    r.toggleEm = apply(markItem, type, {title: 'Toggle emphasis', icon: icons.em});
  }

  if (type = schema.marks.link) {
    r.toggleLink = linkItem(type, {
      title: 'Add or remove link',
      icon: icons.link
    });
  }

  if (type = schema.marks.underline) {
    r.toggleUnderline = apply(markItem, type, {title: 'Toggle underline', icon: icons.underline});
  }

  if (type = schema.marks.strikethrough) {
    r.toggleStrikethrough = apply(markItem, type, {title: 'Toggle strikethrough', icon: icons.strikethrough});
  }

  if (type = schema.marks.superscript) {
    r.toggleSuperscript = apply(markItem, type, {title: 'Toggle superscript', icon: icons.superscript});
  }

  if (type = schema.nodes.image) {
    r.insertImage = insertImageItem(type, {
      title: 'Insert image',
      label: 'Image'
    }, options);
  }

  if (type = schema.nodes.file) {
    r.insertFile = insertFileItem(type, {
      title: 'Insert file',
      label: 'File'
    }, options);
  }

  if (type = schema.nodes.iframe) {
    r.insertYoutube = insertYoutubeItem(type, {
      title: 'Insert Youtube',
      label: 'Youtube'
    });
  }

  if (type = schema.nodes.bullet_list) {
    r.wrapBulletList = apply(wrapListItem, type, {
      title: 'Wrap in bullet list',
      icon: icons.bulletList
    });
  }

  if (type = schema.nodes.ordered_list) {
    r.wrapOrderedList = apply(wrapListItem, type, {
      title: 'Wrap in ordered list',
      icon: icons.orderedList
    });
  }

  if (type = schema.nodes.blockquote) {
    r.wrapBlockQuote = wrapItem(type, {
      title: 'Wrap in block quote',
      label: 'Quote'
    });
  }

  if (type = schema.nodes.paragraph) {
    r.makeParagraph = blockTypeItem(type, {
      title: 'Change to paragraph',
      label: 'Plain'
    });

    r.alignLeft = apply(styleItem, type, {
      title: 'Align left',
      icon: icons.alignLeft,
      attrs: { style: 'text-align: left' }
    });

    r.alignRight = apply(styleItem, type, {
      title: 'Align Right',
      icon: icons.alignRight,
      attrs: { style: 'text-align: right' }
    });

    r.alignCenter = apply(styleItem, type, {
      title: 'Align Center',
      icon: icons.alignCenter,
      attrs: { style: 'text-align: center' }
    });

    r.alignJustify = apply(styleItem, type, {
      title: 'Justify both sides',
      icon: icons.alignJustify,
      attrs: { style: 'text-align: justify' }
    });
  }

  if (type = schema.nodes.heading) {
    for (let i = 1; i <= 10; i++)
      r['makeHead' + i] = blockTypeItem(type, {
        title: `Change to heading ${i}`,
        label: `Level ${i}`,
        attrs: {level: i}
      });
  }

  let cut = arr => arr.filter(x => x);

  function item(label, cmd) { return new MenuItem({label, select: cmd, run: cmd}) }

  if (type = schema.nodes.table) {
    r.insertTable = cut([
      item('Create table', commands['createTable']()),
      item('Insert column before', commands['addColumnBefore']()),
      item('Insert column after', commands['addColumnAfter']()),
      item('Insert row before', commands['addRowBefore']()),
      item('Insert row after', commands['addRowAfter']()),
      item('Merge cells', commands['mergeCells']()),
      item('Split cell', commands['splitCell']()),
      item('Toggle header column', commands['toggleHeaderColumn']()),
      item('Toggle header row', commands['toggleHeaderRow']()),
      item('Toggle header cells', commands['toggleHeaderCell']()),
      item('Delete column', commands['deleteColumn']()),
      item('Delete row', commands['deleteRow']()),
      item('Delete table', commands['deleteTable']())
    ]);
  }

  /* eslint-enable no-cond-assign */

  undoItem.spec.icon = icons.undo;
  redoItem.spec.icon = icons.redo;

  r.insertMenu = new Dropdown(cut([
    r.insertImage,
    r.insertFile,
    r.insertTable && new DropdownSubmenu(r.insertTable, { label: 'Table' })
  ]), { label: 'Insert' });

  r.embedMenu = new Dropdown(cut([
    r.insertYoutube,
  ]), { label: 'Embed' });

  r.typeMenu = new Dropdown(cut([
    r.makeParagraph, r.wrapBlockQuote,
    r.makeHead1 && new DropdownSubmenu(cut([
      r.makeHead1, r.makeHead2, r.makeHead3, r.makeHead4, r.makeHead5, r.makeHead6
    ]), { label: 'Heading' })
  ]), { label: 'Style' });

  r.inlineMenu = [cut([r.toggleStrong, r.toggleEm, r.toggleLink])];
  r.textMenu = [cut([r.toggleUnderline, r.toggleStrikethrough, r.toggleSuperscript])];
  r.blockMenu = [cut([r.wrapBulletList, r.wrapOrderedList, joinUpItem, liftItem])];
  r.alignMenu = [cut([r.alignLeft, r.alignRight, r.alignCenter, r.alignJustify])];
  r.undoRedo = [[undoItem, redoItem]];

  r.fullMenu = [].concat(
    [[r.typeMenu]],
    r.inlineMenu,
    r.textMenu,
    r.alignMenu,
    r.blockMenu,
    [[r.insertMenu]],
    [[r.embedMenu]],
    r.undoRedo
  );

  return r;
}
