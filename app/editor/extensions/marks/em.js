import Mark from '../types/mark';
import { toggleMark } from '../../commands'

export default class Em extends Mark {
  get name() {
    return 'em';
  }

  get schema() {
    return {
      parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
      toDOM() { return ["em", 0] }
    }
  }

  commands({ type }) {
    return () => toggleMark(type);
  }
}
