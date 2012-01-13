$(function() {
  
  window.CharactersView = Backbone.View.extend({
    el: $("#characters"),
    initialize: function() {
      this.model.bind("gameStartedEvent", this.render, this);
      this.model.bind("guessCheckedEvent", this.removeCharacter, this);
    },
    events: {
      'click .character': 'charClicked'
    },
    render: function() {
      this.el.show();
    },
    charClicked: function(event) {
      var target = $(event.target);
      this.model.unset("target")
      this.model.set({char_clicked: target.attr("char"), target: target});
      this.model.check();
    },
    removeCharacter: function(response) {
      var r = JSON.parse(response);
      
      if (r.correct_guess) this.model.get("target").remove();
    }
  })
  
})