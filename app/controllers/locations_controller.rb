class LocationsController < ApplicationController
  require 'json'

  # GET /locations
  def index
    @locations = Location.all
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @locations}
    end
  end

  # GET /locations/:id
  def show
    @location = Location.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @location}
    end
  end

  # GET /locations/:id/survival
  # Renders json survival stats.
  # Is a separate route because population_density attribute makes an api call to DataScienceToolKit
  # Causes noticeable delay in location load time and decided to put survival stats as a separate ajax call for better UX
  def survival
    @location = Location.find(params[:id])
    render json: @location, serializer: LocationSurvivalSerializer
  end

  def create
    @location = Location.find_or_create_by(address: params["address"], latitude: params["latitude"], longitude: params["longitude"])

    if @location.errors.any?
      render json: {errors: @location.errors.full_messages}, status: 422
    else
      render json: @location
    end

  end


end
