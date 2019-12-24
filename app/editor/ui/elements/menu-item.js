import crel from 'crel';
import { getIcon } from './icons';

const prefix = "ProseMirror-menu"

// ::- An icon or label that, when clicked, executes a command.
export class MenuItem {
  // :: (MenuItemSpec)
  constructor(spec) {
    // :: MenuItemSpec
    // The spec used to create the menu item.
    this.spec = spec
  }

  // :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
  // Renders the icon according to its [display
  // spec](#menu.MenuItemSpec.display), and adds an event handler which
  // executes the command when the representation is clicked.
  render(view) {
    let spec = this.spec
    let dom = spec.render ? spec.render(view)
        : spec.icon ? getIcon(spec.icon)
        : spec.label ? crel("div", null, translate(view, spec.label))
        : null
    if (!dom) throw new RangeError("MenuItem without icon or label property")
    if (spec.title) {
      const title = (typeof spec.title === "function" ? spec.title(view.state) : spec.title)
      dom.setAttribute("title", translate(view, title))
    }
    if (spec.class) dom.classList.add(spec.class)
    if (spec.css) dom.style.cssText += spec.css

    dom.addEventListener("mousedown", e => {
      e.preventDefault()
      if (!dom.classList.contains(prefix + "-disabled"))
        spec.run(view.state, view.dispatch, view, e)
    })

    function update(state) {
      if (spec.select) {
        let selected = spec.select(state)
        dom.style.display = selected ? "" : "none"
        if (!selected) return false
      }
      let enabled = true
      if (spec.enable) {
        enabled = spec.enable(state) || false
        setClass(dom, prefix + "-disabled", !enabled)
      }
      if (spec.active) {
        let active = enabled && spec.active(state) || false
        setClass(dom, prefix + "-active", active)
      }
      return true
    }

    return {dom, update}
  }
}

function translate(view, text) {
  return view._props.translate ? view._props.translate(text) : text
}

// Work around classList.toggle being broken in IE11
function setClass(dom, cls, on) {
  if (on) dom.classList.add(cls)
  else dom.classList.remove(cls)
}
