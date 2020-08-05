import Component from '@glimmer/component';
import defaultTo from 'lodash.defaultto';

export default class SaveButton extends Component {
  label = defaultTo(this.args.label, 'Save')
  loadingLabel = defaultTo(this.args.loadingLabel, 'Saving')
}
