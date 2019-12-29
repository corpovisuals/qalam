import { MenuItem } from '../elements';
import { joinUp } from '../../commands';

export const joinUpItem = new MenuItem({
  title: "Join with above block",
  run: joinUp,
  select: state => joinUp(state),
  icon: {
    width: 800, height: 900,
    path: "M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"
  }
});
