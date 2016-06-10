require 'rails_helper'

describe Location do
    context 'Location attributes' do
      it "should have attributes" do
        expect(Location.attribute_names.length).to be > 1
      end

      it "should have the right attributes" do
        expect(Location.attribute_names).to include("longitude")
        expect(Location.attribute_names).to include("latitude")
        expect(Location.attribute_names).to include("address")
      end
    end

    context 'Location validations' do
      let(:location1) {Location.new}
      let(:location2) {Location.new(longitude: 1, latitude: 1)}
      let(:location3) {Location.new(latitude: 1, address: '123 test street')}
      let(:location4) {Location.new(longitude: 1, address: '123 test street')}
      let(:location5) {Location.new(longitude: 1, latitude: 1, address: '123 test street')}

      it "should be invalid without all attributes" do
        expect(location1).to be_invalid
        expect(location1.save).to eq(false)

        expect(location2).to be_invalid
        expect(location2.save).to eq(false)

        expect(location3).to be_invalid
        expect(location3.save).to eq(false)

        expect(location4).to be_invalid
        expect(location4.save).to eq(false)

      end

      it "should be valid with all attributes given" do
        expect(location5).to be_valid
      end

      it "can create a valid location" do
        expect(location5.save).to eq(true)
      end
    end

    context 'Location associations' do
      let(:location) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}
      let(:place1) {Place.create(location_id: location.id, name: "Union Square Greenmarket", description: "market", address: "125 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 1)}
      let(:place2) {Place.create(location_id: location.id, name: "Barnes & Noble", description: "other", address: "127 test street", latitude: 1, longitude: 1, resource_type: 6, resource_count: 1)}

      it "has many places" do
        expect(place1.location).to eq(location)
        expect(place2.location).to eq(location)
        expect(place1.location.id).to eq(location.id)
        expect(place2.location.id).to eq(location.id)

        expect(location.places.count).to eq(2)
      end
    end

    context 'Location methods' do
      let(:location) {Location.create(longitude: 1, latitude: 1, address: '123 test street')}
      let!(:place1) {Place.create(location_id: location.id, name: "Some gun shop", description: "some place", address: "124 test street", latitude: 1, longitude: 1, resource_type: 0, resource_count: 30)}
      let!(:place2) {Place.create(location_id: location.id, name: "Some water source of some kind", description: "some place", address: "126 test street", latitude: 1, longitude: 1, resource_type: 1, resource_count: 30)}
      let!(:place3) {Place.create(location_id: location.id, name: "Some other supermarket", description: "some place", address: "127 test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 10)}
      let!(:place4) {Place.create(location_id: location.id, name: "Some hospital", description: "some place", address: "128 test street", latitude: 1, longitude: 1, resource_type: 3, resource_count: 15)}
      let!(:place5) {Place.create(location_id: location.id, name: "Some hardware store", description: "some place", address: "129 test street", latitude: 1, longitude: 1, resource_type: 4, resource_count: 5)}
      let!(:place6) {Place.create(location_id: location.id, name: "Some airport", description: "some place", address: "130 test street", latitude: 1, longitude: 1, resource_type: 5, resource_count: 5)}
      let!(:place7) {Place.create(location_id: location.id, name: "Some bar", description: "some place", address: "131 test street", latitude: 1, longitude: 1, resource_type: 6, resource_count: 5)}

      describe "#resource_strings" do
        it "should return an array of strings" do
          expect(location.resource_strings).to be_kind_of(Array)
          expect(location.places.count).to eq(7)
        end

        it "should not have any duplicate resource strings" do
          expect(location.resource_strings).to eq(location.resource_strings.uniq)
        end
      end

      describe "#resource_ids" do
        it "should return an array of integers" do
          expect(location.resource_ids).to be_kind_of(Array)
          expect(location.resource_ids[0]).to be_kind_of(Integer)
        end

        it "should not have any duplicate ids" do
          expect(location.resource_ids).to eq(location.resource_ids.uniq)
        end
      end

      describe "#resources_count" do
        it "should return an array of integers" do
          expect(location.resources_count).to be_kind_of(Array)
          expect(location.resources_count[0]).to be_kind_of(Integer)
        end
      end

      describe "#resource_places_count" do
        it "should return an array of integers" do
          expect(location.resource_places_count).to be_kind_of(Array)
          expect(location.resource_places_count[0]).to be_kind_of(Integer)
        end
      end

      describe "#weapons_count" do
        it "should be an integer" do
          expect(location.weapons_count).to be_kind_of(Integer)
        end

        let!(:gun_place) {Place.create(location_id: location.id, name: "Some other gun shop", description: "some place", address: "125 test street", latitude: 1, longitude: 1, resource_type: 0, resource_count: 30)}
        let(:location_weapons_places) {location.places.where(resource_type: 0)}
        let(:locations_weapons_count) {location_weapons_places.pluck(:resource_count).sum}
        it "should be capped at 30 even if the total sum is greater than 30" do
          expect(locations_weapons_count).to be > 30
          expect(location.weapons_count).to eq(30)
        end
      end

      describe "#water_count" do
        it "should be an integer" do
          expect(location.water_count).to be_kind_of(Integer)
        end

        let!(:water_place) {Place.create(location_id: location.id, name: "Some lake", description: "fresh water source", address: "test street", latitude: 1, longitude: 1, resource_type: 1, resource_count: 30)}
        let(:location_water_places) {location.places.where(resource_type: 1)}
        let(:location_water_count) {location_water_places.pluck(:resource_count).sum}
        it "should be capped at 30 even if the total sum is greater than 30" do
          expect(location_water_count).to be > 30
          expect(location.water_count).to eq(30)
        end
      end

      describe "#food_count" do
        it "should be an integer" do
          expect(location.food_count).to be_kind_of(Integer)
        end

        let!(:food_place) {Place.create(location_id: location.id, name: "Costco", description: "the holy grail of non perishable foods", address: "test street", latitude: 1, longitude: 1, resource_type: 2, resource_count: 30)}
        let(:location_food_places) {location.places.where(resource_type: 2)}
        let(:location_food_count) {location_food_places.pluck(:resource_count).sum}
        it "should be capped at 30 even if the total sum is greater than 20" do
          expect(location_food_count).to be > 20
          expect(location.food_count).to eq(20)
        end
      end

      describe "#medicine_count" do
        it "should be an integer" do
          expect(location.medicine_count).to be_kind_of(Integer)
        end

        let!(:medicine_place) {Place.create(location_id: location.id, name: "your local pharmacist", description: "check with your doctor if he/she survived the apocalypse", address: "test street", latitude: 1, longitude: 1, resource_type: 3, resource_count: 30)}
        let(:location_medicince_places) {location.places.where(resource_type: 3)}
        let(:location_medicince_count) {location_medicince_places.pluck(:resource_count).sum}
        it "should be capped at 30 even if the total sum is greater than 15" do
          expect(location_medicince_count).to be > 15
          expect(location.medicine_count).to eq(15)
        end
      end

      describe "#tools_count" do
        it "should be an integer" do
          expect(location.tools_count).to be_kind_of(Integer)
        end

        let!(:tools_place) {Place.create(location_id: location.id, name: "Home Depot", description: "you can get stuff to build your society", address: "test street", latitude: 1, longitude: 1, resource_type: 4, resource_count: 30)}
        let(:location_tools_places) {location.places.where(resource_type: 4)}
        let(:location_tools_count) {location_tools_places.pluck(:resource_count).sum}
        it "should be capped at 30 even if the total sum is greater than 5" do
          expect(location_tools_count).to be > 5
          expect(location.tools_count).to eq(5)
        end
      end

      describe "#transportation_count" do
        it "should be an integer" do
          expect(location.transportation_count).to be_kind_of(Integer)
        end

        let!(:transportation_place) {Place.create(location_id: location.id, name: "parking garage", description: "loot a car. it can help you get to safety", address: "test street", latitude: 1, longitude: 1, resource_type: 5, resource_count: 30)}
        let(:location_transportation_places) {location.places.where(resource_type: 5)}
        let(:location_transportation_count) {location_transportation_places.pluck(:resource_count).sum}
        it "should not be capped" do
          expect(location.transportation_count).to eq(location_transportation_count)
        end
      end

      describe "#others_count" do
        it "should be an integer" do
          expect(location.others_count).to be_kind_of(Integer)
        end

        let!(:other_place) {Place.create(location_id: location.id, name: "the best bar in town", description: "hey there's nothing else to do without society", address: "test street", latitude: 1, longitude: 1, resource_type: 6, resource_count: 30)}
        let(:location_other_places) {location.places.where(resource_type: 6)}
        let(:location_other_count) {location_other_places.pluck(:resource_count).sum}
        it "should not be capped" do
          expect(location.others_count).to eq(location_other_count)
        end
      end

      describe "#population_density" do
        it "should return the population density in square kilometers" do
          expect(location.population_density).to be_kind_of(Integer || Float)
        end
      end

      describe "#percent_survival" do
        it "should return survival rate as a float" do
          expect(location.percent_survival).to be_kind_of(Float)
        end
      end

      describe "#survival?" do
        it "should return a boolean" do
          expect(location.survival?).to eq(true || false)
        end
      end
    end
end
