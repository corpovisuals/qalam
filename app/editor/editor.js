import { DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema } from 'prosemirror-model';
import { inputRules, smartQuotes, emDash, ellipsis} from 'prosemirror-inputrules';
import { menuBar } from 'prosemirror-menu';
import { fixTables } from 'prosemirror-tables';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from './setup';
import { buildMenuItems } from './menu';
import plugins from './plugins';

import nodeInstances from './extensions/nodes/all';
import markInstances from './extensions/marks/all';

import ExtensionManager from './utils/extension-manager';

export class Editor {
  constructor(options = {}) {
    this.defaultOptions = {
      extensions: [
        ...nodeInstances,
        ...markInstances
      ]
    }

    this.init(options);
  }

  init(options = {}) {
    this.options = {
      ...this.defaultOptions,
      ...options,
    }

    this.extensions = this.createExtensions();
    this.schema = this.createSchema();
    this.inputRules = this.createInputRules();
    this.state = this.createState();
    this.view = this.createView();
  }

  createExtensions() {
    return new ExtensionManager(this.options.extensions);
  }

  createNodes() {
    return this.extensions.nodes;
  }

  createMarks() {
    return this.extensions.marks;
  }

  createInputRules() {
    return this.extensions.inputRules({
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
      plugins: exampleSetup({
        schema: this.schema,
      }).concat([
        inputRules({
          rules: this.inputRules,
        }),
        menuBar({ content: buildMenuItems(this.schema, this.extensions).fullMenu })
      ]).concat(plugins)
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
