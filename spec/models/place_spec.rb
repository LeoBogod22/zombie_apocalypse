require 'rails_helper'

describe Place do
  context 'Place attributes' do
    it "should have attributes" do
      expect(Place.attribute_names.length).to be > 1
    end

    it "should have the right attributes" do
      expect(Place.attribute_names).to include("location_id")
      expect(Place.attribute_names).to include("name")
      expect(Place.attribute_names).to include("description")
      expect(Place.attribute_names).to include("address")
      expect(Place.attribute_names).to include("longitude")
      expect(Place.attribute_names).to include("latitude")
      expect(Place.attribute_names).to include("resource_type")
      expect(Place.attribute_names).to include("resource_count")
    end
  end

  context 'Place validations' do
    let(:location) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}

    let(:place1) {Place.new()}
    let(:place2) {Place.new(name: "Union Square Greenmarket", description: "market", address: "125 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 1)}
    let(:place3) {Place.new(location_id: location.id, description: "market", address: "125 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 1)}
    let(:place4) {Place.new(location_id: location.id, name: "Union Square Greenmarket", address: "125 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 1)}
    let(:place5) {Place.new(location_id: location.id, name: "Union Square Greenmarket", description: "market", latitude: 1, longitude: 1, resource_type: 2, resource_count: 1)}
    let(:place6) {Place.new(location_id: location.id, name: "Union Square Greenmarket", description: "market", address: "125 test street", longitude: 1, resource_type: 2, resource_count: 1)}
    let(:place7) {Place.new(location_id: location.id, name: "Union Square Greenmarket", description: "market", address: "125 test street", latitude: 1, resource_type: 2, resource_count: 1)}
    let(:place8) {Place.new(location_id: location.id, name: "Union Square Greenmarket", description: "market", address: "125 test street", latitude: 1, longitude: 1, resource_count: 1)}
    let(:place9) {Place.new(location_id: location.id, name: "Union Square Greenmarket", description: "market", address: "125 test street", latitude: 1, longitude: 1, resource_type: 2)}

    let(:place10) {Place.new(location_id: location.id, name: "Union Square Greenmarket", description: "market", address: "125 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 1)}

    it "should be invalid without all attributes" do
      expect(place1).to be_invalid
      expect(place1.save).to eq(false)

      expect(place2).to be_invalid
      expect(place2.save).to eq(false)

      expect(place3).to be_invalid
      expect(place3.save).to eq(false)

      expect(place4).to be_invalid
      expect(place4.save).to eq(false)

      expect(place5).to be_invalid
      expect(place5.save).to eq(false)

      expect(place6).to be_invalid
      expect(place6.save).to eq(false)

      expect(place7).to be_invalid
      expect(place7.save).to eq(false)

      expect(place8).to be_invalid
      expect(place8.save).to eq(false)

      expect(place9).to be_invalid
      expect(place9.save).to eq(false)
    end

    it "should be valid with all attributes given" do
      expect(place10).to be_valid
    end

    it "should create a place if valid" do
      expect(place10.save).to eq(true)
    end
  end

  context 'Place associations' do
    let(:location) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}
    let(:place) {Place.new(location_id: location.id, name: "Union Square Greenmarket", description: "market", address: "125 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 1)}

    it "should belong to a location" do
        expect(place.location).to eq(location)
    end
  end
end
