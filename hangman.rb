require 'sinatra'
require 'sinatra/static_assets'
require 'haml'

set :root, File.dirname(__FILE__)
set :public_folder, File.dirname(__FILE__) + '/public'

#class HangMan < Sinatra::Base
  
  #register Sinatra::StaticAssets
  
  get "/" do
    haml :index
  end
  
#end