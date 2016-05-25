class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :location_id, :name, :address, :latitude, :longitude, :resource_type, :resource_count
  has_one :location, serializer: LocationSerializer
end
