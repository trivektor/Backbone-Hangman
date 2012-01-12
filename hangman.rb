require 'sinatra'
require 'sinatra/static_assets'
require 'haml'
require 'json'

set :root, File.dirname(__FILE__)
set :public_folder, File.dirname(__FILE__) + '/public'

class Word
  
  def self.masquerade(word)
    disguise = []
    word.each_char do |char|
      disguise << (char == " " ? " " : "&nbsp;")
    end
    disguise
  end
  
end

class Game
  
  
  
end

#class HangMan < Sinatra::Base
  
  #register Sinatra::StaticAssets
  
  get "/" do
    haml :index
  end
  
  post "/new" do
    content = File.read("countries.txt")
    countries = content.split("\n")
    country = countries[rand(countries.size)].upcase
    session[:word] = country
    session[:chars_left] = country.size
    session[:incorrect_guesses] = 0
    
    {:country => country, :word => Word.masquerade(country)}.to_json
  end
  
  post "/check" do
    {:success => 1}.to_json
  end
  
#end