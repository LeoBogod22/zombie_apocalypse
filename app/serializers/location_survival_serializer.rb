class LocationSurvivalSerializer < ActiveModel::Serializer
  attributes :id, :population_density, :percent_survival, :survival?, :resources

  def resources
    {
      resource_ids: object.resource_ids,
      resource_strings: object.resource_strings,
      resources_count: object.resources_count
    }
  end
end
