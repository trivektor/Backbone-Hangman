$(function() {
  
  window.StageView = Backbone.View.extend({
    el: $("#stage"),
    initialize: function() {
      this.model.bind("guessCheckedEvent", this.showGameResult, this);
    },
    showGameResult: function(response) {
      if (response.incorrect_guesses == this.model.get("threshold")) alert(i18n.lose_message);
      if (response.win) alert(i18n.win_message);
    }
  })
  
})