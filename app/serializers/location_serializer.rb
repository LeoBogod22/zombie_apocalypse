class LocationSerializer < ActiveModel::Serializer
  attributes :id, :address, :latitude, :longitude, :resources
  has_many :places

  def resources
    {
      resource_ids: object.resource_ids,
      resource_strings: object.resource_strings,
      resources_count: object.resources_count
    }
  end

end
