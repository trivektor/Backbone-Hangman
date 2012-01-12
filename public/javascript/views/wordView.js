$(function() {
  
  window.WordView = Backbone.View.extend({
    el: $("#word"),
    initialize: function() {
      this.compileTemplates();
      this.model.bind("gameStartedEvent", this.render, this);
    },
    compileTemplates: function() {
      var template_source = $("#word_template").html();
      this.template = Handlebars.compile(template_source);
    },
    render: function(response) {
      var r = $.parseJSON(response);
      var html = this.template({characters: r.word});
      this.el.html(html);
    }
  })
  
})