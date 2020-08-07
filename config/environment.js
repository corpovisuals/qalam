'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'qalam',
    environment,
    rootURL: '/',
    locationType: 'auto',

    HOST_NAME: 'http://localhost:4200',
    STATIC_HOST_NAME: 'http://localhost:4200',
    STORAGE_ENDPOINT: 'http://localhost:4200',

    'ember-validated-form': {
      theme: 'bootstrap'
    },

    fontawesome: {
      icons: {
        'free-solid-svg-icons': [
          'faBold',
          'faItalic',
          'faLink',
          'faListUl',
          'faListOl',
          'faAlignLeft',
          'faAlignRight',
          'faAlignCenter',
          'faAlignJustify',
          'faUndo',
          'faRedo'
        ]
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
