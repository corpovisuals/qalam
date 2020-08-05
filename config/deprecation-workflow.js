/* eslint-disable no-undef */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    // available handlers: silence, log, throw
    // example syntax: { handler: 'silence', matchId: '...' }
    { handler: "silence", matchId: "ember-polyfills.deprecate-merge" },
    { handler: "silence", matchId: "computed-property.override" },
    { handler: "silence", matchId: "computed-property.volatile" },
    { handler: "silence", matchId: "ember-views.curly-components.jquery-element" },
    { handler: "silence", matchId: "ember-component.send-action" },
    { handler: "silence", matchId: "autotracking.mutation-after-consumption" },
    { handler: "silence", matchId: "glimmer.private-in-element" }
  ]
};

/* eslint-enable no-undef */
