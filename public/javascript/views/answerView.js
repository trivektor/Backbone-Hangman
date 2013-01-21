define(['backbone'], function(Backbone) {

  return Backbone.View.extend({
    el: $("#answer"),
    initialize: function() {
      this.model.bind("gameStartedEvent", this.hide, this);
      this.model.bind("answerFetchedEvent", this.render, this);
    },
    render: function(response) {
      if (response.success == 1) {
        this.el.html("Answer: " + response.answer).css('display','block');
      } else {
        alert(response.message);
      }
    },
    hide: function() {
      this.el.hide();
    }
  })
  
})