class PlacesController < ApplicationController
  require 'json'

  def index
  end

  def show
    @place = Place.find(params[:id])
  end

  def create    
    # @place = Place.first_or_create(
    #   location_id: params["location_id"],
    #   name: params["name"],
    #   address: params["address"],

    # )

    @places = params["resource_type"]["types"].each_with_index.collect do |resource, index|
      Place.first_or_create(
        location_id: params["location_id"],
        name: params["name"],
        address: params["address"],
        latitude: params["latitude"],
        longitude: params["longitude"],
        resource_type: resource,
        resource_count: params["resource_type"]["count"][index]
      )
    end

    if @places.errors.any?
      render json: {errors: @places.errors.full_messages}, status: 422
    else
      render json: @places
    end    
  end


end