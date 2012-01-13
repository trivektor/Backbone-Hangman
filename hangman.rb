require 'sinatra'
require 'sinatra/static_assets'
require 'haml'
require 'json'

set :root, File.dirname(__FILE__)
set :public_folder, File.dirname(__FILE__) + '/public'

enable :sessions

class Word
  
  class << self
    def masquerade(word)
      disguise = []
      word.each_char do |char|
        disguise << (char == " " ? " " : "&nbsp;")
      end
      disguise
    end

    def get_random
      content = File.read("countries.txt")
      words = content.split("\n")
      words[rand(words.size)].upcase
    end
    
    def reveal(word, char, last_revealed_word)
      reveal = last_revealed_word
      word.each_char do |c|
        reveal << (c == char ? char : "&nbsp;")
      end
      reveal
    end
    
    def get_answer
      
    end
    
  end
  
end

class Game
  
  class << self
    def check(word, char)
      characters = word.each_char.to_a
      characters.include?(char)
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
  session[:revealed_word] = masquerade_word
  
  {:country => word, :word => masquerade_word}.to_json
end

post "/check" do
  word = session[:word]
  chars = word.each_char.to_a
  char_clicked = params[:char_clicked]
  correct_guess = word.include?(char_clicked)
  
  if correct_guess
    revealed_word = session[:revealed_word]
    revealed_word.each_index do |i|
      if revealed_word[i] == "&nbsp;"
        if chars[i] == char_clicked
          revealed_word[i] = chars[i]
        end
      end
    end
    session[:revealed_word] = revealed_word
  else
    session[:incorrect_guesses] += 1
  end
  {:country => word, :word => session[:revealed_word], :correct_guess => correct_guess, :incorrect_guesses => session[:incorrect_guesses]}.to_json
end

post "/answer" do
  {:answer => session[:word]}.to_json
end