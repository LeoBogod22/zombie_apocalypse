class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :location_id, :name, :address, :latitude, :longitude, :resource_type, :resource_count, :description
  has_one :location, serializer: PlaceLocationSerializer
end
