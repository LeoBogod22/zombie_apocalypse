class LocationSerializer < ActiveModel::Serializer
  attributes :id, :address, :latitude, :longitude
  has_many :places
end
