import {
  wrapItem, blockTypeItem, Dropdown, DropdownSubmenu, joinUpItem, liftItem,
  undoItem, redoItem, MenuItem
} from 'prosemirror-menu';
import { linkItem, styleItem, insertImageItem,
  markItem, wrapListItem
} from './items';
import { icons } from './icons';

export function buildMenuItems(schema, addons) {
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
    r.toggleLink = apply(linkItem, type, {
      title: 'Add or remove link',
      icon: icons.link
    });
  }

  if (type = schema.nodes.image) {
    r.insertImage = apply(insertImageItem, type, {
      title: 'Insert image',
      label: 'Image'
    });
  }

  if (type = schema.nodes.bullet_list) {
    r.wrapBulletList = wrapListItem(type, {
      title: 'Wrap in bullet list',
      icon: icons.bulletList
    });
  }

  if (type = schema.nodes.ordered_list) {
    r.wrapOrderedList = wrapListItem(type, {
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
    r.insertTable && new DropdownSubmenu(r.insertTable, { label: 'Table' })
  ]), { label: 'Insert' });

  r.typeMenu = new Dropdown(cut([
    r.makeParagraph, r.wrapBlockQuote,
    r.makeHead1 && new DropdownSubmenu(cut([
      r.makeHead1, r.makeHead2, r.makeHead3, r.makeHead4, r.makeHead5, r.makeHead6
    ]), { label: 'Heading' })
  ]), { label: 'Style' });

  r.inlineMenu = [cut([r.toggleStrong, r.toggleEm, r.toggleLink])];
  r.blockMenu = [cut([r.wrapBulletList, r.wrapOrderedList, joinUpItem, liftItem])];
  r.alignMenu = [cut([r.alignLeft, r.alignRight, r.alignCenter, r.alignJustify])];
  r.undoRedo = [[undoItem, redoItem]];

  r.fullMenu = [].concat(
    [[r.typeMenu]],
    r.inlineMenu,
    r.alignMenu,
    r.blockMenu,
    [[r.insertMenu]],
    r.undoRedo
  );

  return r;
}
