import { DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { menuBar } from 'prosemirror-menu';
import { fixTables } from 'prosemirror-tables';
import { keymap } from 'prosemirror-keymap';
import { Plugin } from "prosemirror-state";
import { baseKeymap } from "prosemirror-commands";
import { dropCursor } from "prosemirror-dropcursor";
import { gapCursor } from "prosemirror-gapcursor";
import {
  inputRules, smartQuotes, emDash, ellipsis
} from 'prosemirror-inputrules';

import { buildMenuItems } from './ui';

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
    this.plugins = this.createPlugins();
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

  createPlugins() {
    return this.addons.plugins;
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

    return new Schema({ nodes, marks });
  }

  createState() {
    let doc = DOMParser.fromSchema(this.schema).parse(this.options.content)
    let state = EditorState.create({
      doc,
      plugins: [
        ...this.plugins,
        inputRules({
          rules: this.inputRules,
        }),
        ...this.keymaps,
        keymap(baseKeymap),
        dropCursor(),
        gapCursor(),
        menuBar({ content: buildMenuItems(this.schema, this.addons).fullMenu }),
        new Plugin({
          props: {
            attributes: {class: "ProseMirror-example-setup-style"}
          }
        })
      ]
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
