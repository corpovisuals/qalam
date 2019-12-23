import { DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { inputRules, smartQuotes, emDash, ellipsis} from 'prosemirror-inputrules';
import { menuBar } from 'prosemirror-menu';
import { fixTables } from 'prosemirror-tables';
import { addListNodes } from 'prosemirror-schema-list';
import { buildMenuItems } from './menu';
import plugins from './plugins';

import nodeInstances from './addons/nodes/all';
import markInstances from './addons/marks/all';
import extensionInstances from './addons/extensions/all';

import AddonManager from './utils/addon-manager';

export class Editor {
  constructor(options = {}) {
    this.defaultOptions = {
      addons: [
        ...nodeInstances,
        ...markInstances,
        ...extensionInstances
      ]
    }

    this.init(options);
  }

  init(options = {}) {
    this.options = {
      ...this.defaultOptions,
      ...options,
    }

    this.addons = this.createAddons();
    this.schema = this.createSchema();
    this.keymaps = this.createKeymaps();
    this.inputRules = this.createInputRules();
    this.state = this.createState();
    this.view = this.createView();
  }

  createAddons() {
    return new AddonManager(this.options.addons);
  }

  createNodes() {
    return this.addons.nodes;
  }

  createMarks() {
    return this.addons.marks;
  }

  createKeymaps() {
    return this.addons.keymaps({
      schema: this.schema,
    })
  }

  createInputRules() {
    return this.addons.inputRules({
      schema: this.schema,
    }).concat(smartQuotes).concat(ellipsis, emDash);
  }

  createSchema() {
    let nodes = this.createNodes();
    let marks = this.createMarks();

    const baseSchema = new Schema({nodes, marks});

    return new Schema({
      nodes: addListNodes(
        baseSchema.spec.nodes, 'paragraph block*', 'block'
      ),

      marks: baseSchema.spec.marks
    });
  }

  createState() {
    let doc = DOMParser.fromSchema(this.schema).parse(this.options.content)
    let state = EditorState.create({
      doc,
      plugins: [
        inputRules({
          rules: this.inputRules,
        }),
        ...this.keymaps,
        menuBar({ content: buildMenuItems(this.schema, this.addons).fullMenu })
      ].concat(plugins)
    });

    let fix = fixTables(state);
    if (fix) state = state.apply(fix.setMeta('addToHistory', false));
    return state;
  }

  createView() {
    let options = this.options;
    let view = new EditorView(options.place, {
      state: this.state,

      dispatchTransaction(transaction) {
        let newState = view.state.apply(transaction);
        view.updateState(newState);
        if (transaction.docChanged) {
          options.onUpdate(view.dom.innerHTML, transaction.doc);
        }
      }
    });

    return view;
  }
}
