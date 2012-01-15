require 'sinatra'
require 'sinatra/static_assets'
require 'haml'
require 'json'

set :root, File.dirname(__FILE__)

#enable :sessions
use Rack::Session::Pool, :expire_after => 2592000

class Word
  
  class << self
    def get_random
      content = File.read("countries.txt")
      words = content.split("\n")
      words[rand(words.size)].upcase
    end
    
    def masquerade(word)
      word.each_char.inject([]) { |disguise, char| disguise << (char == " " ? " " : "&nbsp;"); disguise }
    end
    
    def reveal(last_revealed_word, char_clicked, final_word)
      chars = final_word.each_char.to_a
      
      last_revealed_word.each_index do |i|
        last_revealed_word[i] = chars[i] if last_revealed_word[i] == "&nbsp;" and chars[i] == char_clicked
      end
    end
    
    def chars_left(revealed_word)
      revealed_word.count { |c| c == "&nbsp;" }
    end
    
  end
  
end

class Game
  
  class << self    
    def win?(chars_left, incorrect_guesses)
      chars_left == 0 and incorrect_guesses < 6
    end
    
    def correct_guess?(char_clicked, final_word)
      final_word.include?(char_clicked)
    end
  end
  
end

get "/" do
  haml :index
end

post "/new" do
  word = Word.get_random
  masquerade_word = Word.masquerade(word)
  
  session[:word] = word
  session[:incorrect_guesses] = 0
  session[:chars_left] = word.size
  session[:revealed_word] = masquerade_word
  
  {:word => masquerade_word}.to_json
end

post "/check" do
  final_word = session[:word]
  char_clicked = params[:char_clicked]
  correct_guess = Game.correct_guess?(char_clicked, final_word)
  
  if correct_guess
    session[:revealed_word] = Word.reveal(session[:revealed_word], char_clicked, final_word)
    session[:chars_left] = Word.chars_left(session[:revealed_word])
  else
    session[:incorrect_guesses] += 1
  end
  win = Game.win?(session[:chars_left], session[:incorrect_guesses])
  
  {:word => session[:revealed_word], :correct_guess => correct_guess, :incorrect_guesses => session[:incorrect_guesses], :win => win}.to_json
end

post "/answer" do
  if (session[:incorrect_guesses] < 6 and session[:chars_left] > 0)
    {:success => -1, :message => "You haven't finished the game yet"}.to_json
  else
    {:success => 1, :answer => session[:word]}.to_json
  end
end