class PlacesController < ApplicationController
  require 'json'

  def index
  end

  def show
    @place = Place.find(params[:id])
  end

  def create    
    @place = Place.create()
  end


end