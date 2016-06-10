require 'rails_helper'

describe PlacesController do
  let(:location) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}
  let!(:place) {Place.create(location_id: location.id, name: "Some gun shop", description: "some place", address: "124 test street", latitude: 1, longitude: 1, resource_type: 0, resource_count: 30)}
  let!(:place2) {Place.create(location_id: location.id, name: "Lake", description: "watery", address: "124 test street", latitude: 1, longitude: 1, resource_type: 1, resource_count: 30)}

  context 'GET show' do
    it "should respond with json when requested" do
      get :show, id: place.id, :format => :json

      expect(response.content_type).to eq('application/json')
    end

    it "should render json with place" do
      get :show, id: place.id, :format => :json
      resp = JSON.parse(response.body)

      expect(resp["place"]).to_not be_nil
      expect(resp["place"]["id"]).to eq(place.id)
      expect(resp["place"]["address"]).to eq(place.address)
      expect(resp["place"]["latitude"]).to eq(place.latitude)
      expect(resp["place"]["longitude"]).to eq(place.longitude)
      expect(resp["place"]["name"]).to eq(place.name)
      expect(resp["place"]["description"]).to eq(place.description)
      expect(resp["place"]["resource_type"]).to eq(place.resource_type)
      expect(resp["place"]["resource_count"]).to eq(place.resource_count)
    end

    it "should render json with location" do
      get :show, id: place.id, :format => :json
      resp = JSON.parse(response.body)

      expect(resp["place"]["location"]).to_not be_nil
      expect(resp["place"]["location"]["id"]).to eq(location.id)
      expect(resp["place"]["location"]["address"]).to eq(location.address)
      expect(resp["place"]["location"]["latitude"]).to eq(location.latitude)
      expect(resp["place"]["location"]["longitude"]).to eq(location.longitude)
    end
  end

  context 'GET index' do
    it "should render places as json" do
      get :index, :format => :json
      resp = JSON.parse(response.body)

      expect(resp["places"].length).to eq(2)
    end
  end

  context 'GET resource' do
    it "should only get the places with the specified location id and resource id" do
      params = {location_id: location.id, resource_id: 0}
      get :resource, params
      resp = JSON.parse(response.body)
      resource_place = resp["places"][0]

      expect(resp["places"].length).to eq(1)
      expect(resource_place["name"]).to eq(place.name)
      expect(resource_place["description"]).to eq(place.description)
      expect(resource_place["resource_type"]).to eq(place.resource_type)
    end
  end

  context 'POST create' do
    it "should create a place and render json" do
      params = {
        location_id: location.id,
        name: "magical vacation spot with that they go to after the super bowl",
        description: "the happiest something on earth",
        address: "i think it's in Anaheim or Orlando. one of those two",
        latitude: "123",
        longitude: "456",
        resource_type: {types: ['food'], count: ['10']}
      }
      post :create, params
      resp = JSON.parse(response.body)

      expect(Place.last.location_id).to eq(params[:location_id])
      expect(Place.last.name).to eq(params[:name])
      expect(Place.last.description).to eq(params[:description])
      expect(Place.last.address).to eq(params[:address])
      expect(Place.last.longitude).to eq(params[:longitude])
      expect(Place.last.latitude).to eq(params[:latitude])
      expect(Place.last.resource_type).to eq("food")
      expect(Place.last.resource_count).to eq(10)
    end

    it "should create multiple places if resource_type has more than on resource in types and counts" do
      params = {
        location_id: location.id,
        name: "walmart",
        description: "the place you want to be in an apocalypse. everything is in one place",
        address: "somewhere in texas?",
        latitude: "123",
        longitude: "456",
        resource_type: {types: ['water', 'food'], count: ['15', '10']}
      }
      post :create, params
      resp = JSON.parse(response.body)

      last_place = Place.last
      second_to_last_place = Place.all[Place.count - 2]

      expect(last_place.location_id).to eq(second_to_last_place.location_id)
      expect(last_place.name).to eq(second_to_last_place.name)
      expect(last_place.description).to eq(second_to_last_place.description)
      expect(last_place.address).to eq(second_to_last_place.address)
      expect(last_place.longitude).to eq(second_to_last_place.longitude)
      expect(last_place.latitude).to eq(second_to_last_place.latitude)

      expect(last_place.resource_type).to eq("water").or(eq("food"))
      expect(last_place.resource_count).to eq(15).or(eq(10))
    end
  end
end
