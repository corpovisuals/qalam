import { cmdItem } from './cmd-item';
import { markActive } from '../../commands';

export function markItem(commands) {
  return (markType, options) => {
    let passedOptions = {
      active(state) { return markActive(state, markType) },
      enable: true
    }
    for (let prop in options) passedOptions[prop] = options[prop]
    return cmdItem(commands[markType.name](), passedOptions)
  }
}
