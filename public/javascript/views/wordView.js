define(['backbone'], function(Backbone) {

  return Backbone.View.extend({
    el: $("#word"),
    initialize: function() {
      this.compileTemplates();
      this.model.bind("gameStartedEvent", this.render, this);
      this.model.bind("guessCheckedEvent", this.displayGuessResult, this);
    },
    compileTemplates: function() {
      var template_source = $("#word_template").html();
      this.template = Handlebars.compile(template_source);
    },
    render: function(response) {
      $("#hint").css('display','block');
      var html = this.template({characters: response.word});
      this.el.html(html).css('display','block');
    },
    displayGuessResult: function(response) {
      var html = this.template({characters: response.word});
      this.el.html(html);
    }
  })
  
})