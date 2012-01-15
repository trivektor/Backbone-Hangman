$(function() {
  
  window.StageView = Backbone.View.extend({
    el: $("#stage"),
    initialize: function() {
      this.model.bind("guessCheckedEvent", this.showGameResult, this);
    },
    showGameResult: function(response) {
      if (response.incorrect_guesses == this.model.get("threshold")) alert("Sorry! You've lost");
      if (response.win) alert("Congratulations! You've won");
    }
  })
  
})