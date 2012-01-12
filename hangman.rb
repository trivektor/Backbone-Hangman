require 'sinatra'
require 'sinatra/static_assets'
require 'haml'
require 'json'

set :root, File.dirname(__FILE__)
set :public_folder, File.dirname(__FILE__) + '/public'

#class HangMan < Sinatra::Base
  
  #register Sinatra::StaticAssets
  
  get "/" do
    haml :index
  end
  
  post "/new" do
    content = File.read("countries.txt")
    countries = content.split("\n")
    country = countries[rand(countries.size)]
    session[:country] = country
    
    {:spaces => country.size, :country => country}.to_json
  end
  
  post "/check" do
    {:success => 1}.to_json
  end
  
#end