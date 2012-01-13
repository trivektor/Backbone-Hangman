$(function() {
  
  window.CharactersView = Backbone.View.extend({
    el: $("#characters"),
    initialize: function() {
      this.model.bind("guessCheckedEvent", this.removeCharacter, this);
    },
    events: {
      'click .character': 'charClicked'
    },
    charClicked: function(event) {
      var target = $(event.target);
      this.model.unset("target")
      this.model.set({char_clicked: target.attr("char"), target: target});
      this.model.check();
    },
    removeCharacter: function(response) {
      console.log("removing character if applicable")
      var r = JSON.parse(response);
      
      if (r.correct_guess) this.model.get("target").remove();
    }
  })
  
})