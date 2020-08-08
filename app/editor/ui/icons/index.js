import {
  faBold,
  faItalic,
  faLink,
  faUnderline,
  faStrikethrough,
  faSuperscript,
  faListUl,
  faListOl,
  faUndo,
  faRedo,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faAlignJustify
} from '@fortawesome/free-solid-svg-icons';

function iconAttrs(icon) {
  return {
    width: icon.icon[0], height: icon.icon[1],
    path: icon.icon[4]
  }
}

export const icons = {
  strong: iconAttrs(faBold),
  em: iconAttrs(faItalic),
  link: iconAttrs(faLink),
  underline: iconAttrs(faUnderline),
  strikethrough: iconAttrs(faStrikethrough),
  superscript: iconAttrs(faSuperscript),
  bulletList: iconAttrs(faListUl),
  orderedList: iconAttrs(faListOl),
  alignLeft: iconAttrs(faAlignLeft),
  alignRight: iconAttrs(faAlignRight),
  alignCenter: iconAttrs(faAlignCenter),
  alignJustify: iconAttrs(faAlignJustify),
  undo: iconAttrs(faUndo),
  redo: iconAttrs(faRedo)
};
