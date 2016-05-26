class PlacesController < ApplicationController
  require 'json'

  def index
    @places = Place.all
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @places}
    end
  end

  def show
    @place = Place.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @place}
    end
  end

  def create
    puts params["location_id"]
    location = Location.find(params["location_id"])

    @places = params["resource_type"]["types"].each_with_index.map do |resource, index|
      Place.find_or_create_by(
        location_id: location.id,
        name: params["name"],
        address: params["address"],
        latitude: params["latitude"],
        longitude: params["longitude"],
        resource_type: Place.resource_types[resource],
        resource_count: params["resource_type"]["count"][index]
      )
    end

    @places.each do |place|
      if place.errors.any?
        render json: {errors: place.errors.full_messages}
      end
    end

    render json: @places[0]
  end


end
