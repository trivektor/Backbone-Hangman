$(function() {
  
  window.HangmanView = Backbone.View.extend({
    el: $("#pole"),
    initialize: function() {
      this.compileTemplates();
      this.model.bind("guessCheckedEvent", this.drawHangman, this);
    },
    compileTemplates: function() {
      var head = $("#head_template").html();
      this.head_template = Handlebars.compile(head);
      
      var body = $("#body_template").html();
      this.body_template = Handlebars.compile(body);
    },
    drawHangman: function(response) {
      this.el.append($(this.head_template({})));
      this.el.append($(this.body_template({})));
    }
  })
  
})