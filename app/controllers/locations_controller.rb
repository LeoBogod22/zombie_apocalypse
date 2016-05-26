class LocationsController < ApplicationController
  require 'json'

  def index
    @locations = Location.all
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @locations}
    end
  end

  def show
    @location = Location.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @location}
    end
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
