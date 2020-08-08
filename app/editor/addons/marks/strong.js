import Mark from '../types/mark';
import { toggleMark } from '../../commands'

export default class Strong extends Mark {
  get name() {
    return 'strong';
  }

  get schema() {
    return {
      parseDOM: [
        { tag: 'strong' },
        // This works around a Google Docs misbehavior where
        // pasted content will be inexplicably wrapped in `<b>`
        // tags with a font-weight normal.
        {
          tag: 'b',
          getAttrs: node => node.style.fontWeight != 'normal' && null
        },
        {
          style: 'font-weight',
          getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
        }
      ],
      toDOM() { return ['strong', 0] }
    }
  }

  commands({ type }) {
    return () => toggleMark(type);
  }

  keys({ type }) {
    return {
      'Mod-b': toggleMark(type),
      'Mod-B': toggleMark(type)
    }
  }
}
