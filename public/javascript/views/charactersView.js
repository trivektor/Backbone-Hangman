$(function() {
  
  window.CharactersView = Backbone.View.extend({
    el: $("#characters"),
    events: {
      'click .character': 'charClicked'
    },
    charClicked: function(event) {
      var target = $(event.target);
      this.model.set({char_clicked: target.attr("char")});
      this.model.check();
    }
  })
  
})