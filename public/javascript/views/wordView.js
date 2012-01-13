$(function() {
  
  window.WordView = Backbone.View.extend({
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
      var r = $.parseJSON(response);
      var html = this.template({characters: r.word});
      this.el.hide();
      this.el.html(html).show();
    },
    displayGuessResult: function(response) {
      var r = $.parseJSON(response);
      var html = this.template({characters: r.word});
      this.el.html(html);
    }
  })
  
})