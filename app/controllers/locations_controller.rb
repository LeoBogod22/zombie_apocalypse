class LocationsController < ApplicationController
  require 'json'

  def index
  end

  def show
    @location = Location.find(params[:id])
  end

  def create    
    @location = Location.create(address: params["address"], latitude: params["latitude"], longitude: params["longitude"])
    redirect_to location_path(@location)
  end


end