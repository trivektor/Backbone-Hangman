$(function() {
  
  window.Game = Backbone.Model.extend({
    initialize: function() {
      this.set({lost: false});
    },
    new: function() {
      var _this = this;
      
      $.ajax({
        url: "/new",
        type: "POST",
        success: function(response) {
          var json = $.parseJSON(response);
          
          _this.trigger("gameStartedEvent", json);
        }
      })
    },
    check: function() {
      var _this = this;
      
      if (_this.get("lost")) return;
      
      $.ajax({
        url: "/check",
        type: "POST",
        data: {char_clicked: this.get("char_clicked")},
        success: function(response) {
          var json = $.parseJSON(response);
          
          if (json.incorrect_guesses >= 7) _this.set({lost: true});
          _this.trigger("guessCheckedEvent", json);
        }
      })
    }
  })
  
})