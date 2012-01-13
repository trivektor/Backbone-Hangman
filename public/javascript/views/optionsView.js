$(function() {
  
  window.OptionsView = Backbone.View.extend({
    el: $("#options"),
    initialize: function() {
      this.model.bind("gameStartedEvent", this.removeGetAnswerButton, this);
      this.model.bind("guessCheckedEvent", this.showGetAnswerButton, this);
    },
    events: {
      'click #new_game': 'startNewGame',
      'click #show_answer': 'showAnswer'
    },
    startNewGame: function() {
      this.model.new();
    },
    removeGetAnswerButton: function() {
      $("#show_answer").remove();
    },
    showGetAnswerButton: function(response) {
      if (response.incorrect_guesses == this.model.get("threshold")) {
        this.el.append('<input type="button" id="show_answer" class="action_button" value="Show answer" />');
      }
    },
    showAnswer: function() {
      this.model.get_answer();
    }
  })
  
})