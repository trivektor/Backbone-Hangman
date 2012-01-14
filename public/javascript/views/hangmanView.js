$(function() {
  
  window.HangmanView = Backbone.View.extend({
    el: $("#ground"),
    initialize: function() {
      this.setupSelectors();
      this.model.bind("gameStartedEvent", this.clearHangman, this);
      this.model.bind("guessCheckedEvent", this.drawHangman, this);
    },
    setupSelectors: function() {
      this.body_parts = [$("#head"), $("#body"), $("#right_arm"), $("#left_arm"), $("#right_leg"), $("#left_leg")];
    },
    drawHangman: function(response) {
      if (!response.correct_guess) this.body_parts[parseInt(response.incorrect_guesses)-1].css("visibility", "visible");
    },
    clearHangman: function() {
      $("#string").css("visibility", "visible")
      
      _.each(this.body_parts, function(part) {
        part.css("visibility", "hidden");
      })
    }
  })
  
})