$(function() {
  
  window.Game = Backbone.Model.extend({
    new: function() {
      var _this = this;
      
      $.ajax({
        url: "/new",
        type: "POST",
        success: function(response) {
          _this.trigger("gameStartedEvent", response);
        }
      })
    },
    check: function() {
      var _this = this;
      
      $.ajax({
        url: "/check",
        type: "POST",
        data: {char_clicked: this.get("char_clicked")},
        success: function(response) {
          
        }
      })
    }
  })
  
})