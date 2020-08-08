import Mark from '../types/mark';
import { toggleMark } from '../../commands'

export default class Underline extends Mark {
  get name() {
    return 'underline';
  }

  get schema() {
    return {
      parseDOM: [{ style: 'text-decoration=underline' }],
      toDOM() {
        let style = 'text-decoration: underline;';
        return ['span', { style }, 0];
      }
    }
  }

  commands({ type }) {
    return () => toggleMark(type);
  }
}
