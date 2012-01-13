$(function() {
  
  window.StageView = Backbone.View.extend({
    el: $("#state"),
    initialize: function() {
      this.model.bind("guessCheckedEvent", this.showGameResult, this);
    },
    showGameResult: function(response) {
      if (response.incorrect_guesses == this.model.get("threshold")) {
        this.model.set({lost: true});
        alert("Sorry! You've lost");
      }
      if (response.win) alert("Congratulations! You've won");
    }
  })
  
})