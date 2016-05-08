class LocationsController < ApplicationController
  require 'json'

  def index
  end

  def show
    @location = Location.find(params[:id])
  end

  def create    
    @location = Location.first_or_create(address: params["address"], latitude: params["latitude"], longitude: params["longitude"])
    

    if @location.errors.any?
      render json: {errors: @location.errors.full_messages}, status: 422
    else
      render json: @location  
    end
    
  end


end