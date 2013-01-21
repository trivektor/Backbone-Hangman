require.config({

  "deps" : ["hangman"],

  "shim" : {
    "backbone" : {
      "deps" : ["underscore", "jquery", "handlebars", "i18n"],
      "exports" : "Backbone"
    }
  }

});
