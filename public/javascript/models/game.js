$(function() {
  
  window.Game = Backbone.Model.extend({
    defaults: {
      threshold: 6
    },
    initialize: function() {
      this.set({
        win: false, 
        lost: false
      });
    },
    new: function() {
      var _this = this;
      
      $.ajax({
        url: "/new",
        type: "POST",
        success: function(response) {
          var json = $.parseJSON(response);
          
          _this.set({lost: false});
          _this.set({win: false});
          _this.trigger("gameStartedEvent", json);
        }
      })
    },
    check: function() {
      var _this = this;
      
      if (_this.get("lost") || _this.get("win")) return;
      
      $.ajax({
        url: "/check",
        type: "POST",
        data: {char_clicked: this.get("char_clicked")},
        success: function(response) {
          var json = $.parseJSON(response);
          
          if (json.incorrect_guesses >= _this.get("threshold")) _this.set({lost: true});
          if (json.win) _this.set({win: true});
          
          _this.trigger("guessCheckedEvent", json);
        }
      })
    },
    get_answer: function() {
      var _this = this;
      
      if (!_this.get("lost")) return;
      
      $.ajax({
        url: "/answer",
        type: "POST",
        success: function(response) {
          var json = $.parseJSON(response);
          
          _this.trigger("answerFetchedEvent", json);
        }
      })
    }
  })
  
})