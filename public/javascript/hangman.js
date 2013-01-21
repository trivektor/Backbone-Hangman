define([
  'models/game',
  'views/answerView',
  'views/charactersView',
  'views/hangmanView',
  'views/optionsView',
  'views/stageView',
  'views/wordView'
],

function(Game, OptionsView, CharactersView, WordView, HangmanView, AnswerView, StageView) {

  var game            = new Game;
  var options_view    = new OptionsView({model: game});
  var characters_view = new CharactersView({model: game});
  var word_view       = new WordView({model: game});
  var hangman_view    = new HangmanView({model: game});
  var answer_view     = new AnswerView({model: game});
  var stage_view      = new StageView({model: game});

});
