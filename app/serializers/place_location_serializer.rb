class PlaceLocationSerializer < ActiveModel::Serializer
  attributes :id, :address, :latitude, :longitude
end
