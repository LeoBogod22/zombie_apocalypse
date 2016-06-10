require 'rails_helper'

describe PlacesController do
  let(:location) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}
  let!(:place) {Place.create(location_id: location.id, name: "Some gun shop", description: "some place", address: "124 test street", latitude: 1, longitude: 1, resource_type: 0, resource_count: 30)}

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
end
