require 'rails_helper'

describe LocationsController do
  let(:location) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}
  let!(:location2) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}
  let!(:place1) {Place.create(location_id: location.id, name: "Some gun shop", description: "some place", address: "124 test street", latitude: 1, longitude: 1, resource_type: 0, resource_count: 30)}
  let!(:place2) {Place.create(location_id: location.id, name: "Some water source of some kind", description: "some place", address: "126 test street", latitude: 1, longitude: 1, resource_type: 1, resource_count: 30)}
  let!(:place3) {Place.create(location_id: location.id, name: "Some other supermarket", description: "some place", address: "127 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 10)}
  let!(:place4) {Place.create(location_id: location.id, name: "Some hospital", description: "some place", address: "128 test street", latitude: 1, longitude: 1, resource_type: 3, resource_count: 15)}
  let!(:place5) {Place.create(location_id: location.id, name: "Some hardware store", description: "some place", address: "129 test street", latitude: 1, longitude: 1, resource_type: 4, resource_count: 5)}
  let!(:place6) {Place.create(location_id: location.id, name: "Some airport", description: "some place", address: "130 test street", latitude: 1, longitude: 1, resource_type: 5, resource_count: 5)}
  let!(:place7) {Place.create(location_id: location.id, name: "Some bar", description: "some place", address: "131 test street", latitude: 1, longitude: 1, resource_type: 6, resource_count: 5)}

  context 'GET show' do
    it "should respond with json when requested" do
      get :show, id: location.id, :format => :json

      expect(response.content_type).to eq('application/json')
    end

    it "should render json with location" do
      get :show, id: location.id, :format => :json
      resp = JSON.parse(response.body)

      expect(resp["location"]).to_not be_nil
      expect(resp["location"]["id"]).to eq(location.id)
      expect(resp["location"]["address"]).to eq(location.address)
      expect(resp["location"]["latitude"]).to eq(location.latitude)
      expect(resp["location"]["longitude"]).to eq(location.longitude)
    end

    it "should render json with location's places" do
      get :show, id: location.id, :format => :json
      resp = JSON.parse(response.body)

      expect(resp["location"]["places"]).to_not be_nil
      expect(resp["location"]["places"].length).to eq(location.places.count)
    end

    it "should render json with resource arrays" do
      get :show, id: location.id, :format => :json
      resp = JSON.parse(response.body)

      expect(resp["location"]["resources"]).to_not be_nil
      expect(resp["location"]["resources"].length).to eq(4)
      expect(resp["location"]["resources"]["resource_ids"]).to be_kind_of(Array)
      expect(resp["location"]["resources"]["resource_strings"]).to be_kind_of(Array)
      expect(resp["location"]["resources"]["resources_count"]).to be_kind_of(Array)
      expect(resp["location"]["resources"]["resource_places_count"]).to be_kind_of(Array)
    end
  end

  context 'GET index' do
    it "should return json with multiple locations" do
      get :index, :format => :json
      resp = JSON.parse(response.body)

      expect(resp["locations"].length).to eq(2)
    end
  end

  context 'POST create' do
    it "should create a location then respond serialized json" do
      params = {latitude: "123", longitude: "456", address: '123 test street'}
      post :create, params
      resp = JSON.parse(response.body)

      expect(resp["location"]["latitude"]).to eq("123")
      expect(resp["location"]["longitude"]).to eq("456")
      expect(resp["location"]["address"]).to eq("123 test street")
    end
  end
end
