import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';

export default class ResponsiveContent extends Component {
  get style() {
    let paddingHeight = ((this.args.height / this.args.width) * 100).toFixed(2);
    return htmlSafe(`padding-bottom: ${paddingHeight}%; height: ${paddingHeight}%;`);
  }
}
