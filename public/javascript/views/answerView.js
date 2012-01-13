$(function() {
  
  window.AnswerView = Backbone.View.extend({
    el: $("#answer"),
    initialize: function() {
      this.model.bind("gameStartedEvent", this.hide, this);
      this.model.bind("answerFetchedEvent", this.render, this);
    },
    render: function(response) {
      this.el.html(response.answer).show();
    },
    hide: function() {
      this.el.hide();
    }
  })
  
})