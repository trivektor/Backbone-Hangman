$(function() {
  
  window.HangmanView = Backbone.View.extend({
    el: $("#pole"),
    initialize: function() {
      this.setupSelectors();
      this.model.bind("guessCheckedEvent", this.drawHangman, this);
    },
    setupSelectors: function() {
      this.body_parts = [$("#head"), $("#body"), $("#right_hand"), $("#left_hand"), $("#right_leg"), $("#left_leg")];
    },
    drawHangman: function(response) {
      var r = $.parseJSON(response);
      
      if (r.incorrect_guesses) this.body_parts[parseInt(r.incorrect_guesses)-1].css("visibility", "visible");
    }
  })
  
})