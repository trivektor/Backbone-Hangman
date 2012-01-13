$(function() {
  
  window.CharactersView = Backbone.View.extend({
    el: $("#characters"),
    initialize: function() {
      var character_template = $("#character_template").html();
      this.character_template = Handlebars.compile(character_template)
      
      this.model.bind("gameStartedEvent", this.render, this);
      this.model.bind("guessCheckedEvent", this.removeCharacter, this);
    },
    events: {
      'click .character': 'charClicked'
    },
    render: function() {
      var chars = this.character_template({characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z', 'W', '&']})
      this.el.html(chars).show();
    },
    charClicked: function(event) {
      if (this.model.get("lost")) return;
      
      var target = $(event.target);
      this.model.unset("target")
      this.model.set({char_clicked: target.attr("char"), target: target});
      this.model.check();
    },
    removeCharacter: function(response) {      
      if (response.correct_guess) this.model.get("target").remove();
    }
  })
  
})