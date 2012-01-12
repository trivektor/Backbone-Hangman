$(function() {
  
  window.OptionsView = Backbone.View.extend({
    el: $("#options"),
    events: {
      'click #new_game': 'startNewGame'
    },
    startNewGame: function() {
      this.model.new();
    }
  })
  
})