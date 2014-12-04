class WelcomeController < ApplicationController
  def index
    redirect_to :action => :app
  end

  def app
  end
end
