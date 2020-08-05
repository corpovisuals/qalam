import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

export default class Paginator extends Component {
  @service scroller

  scrollBack(element, [instance]) {
    let scrollToElement = instance.scrollTo(element);
    scheduleOnce('afterRender', instance, scrollToElement);
  }

  scrollTo(element) {
    return function() {
      if (!this._isVisible(element)) {
        this.scroller.scrollVertical(element);
      }
    }
  }

  _isVisible(element) {
    let rect = element.getBoundingClientRect();
    return rect.top >= 0;
  }
}
