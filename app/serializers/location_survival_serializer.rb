class LocationSurvivalSerializer < ActiveModel::Serializer
  attributes :id, :population_density, :percent_survival, :survival?
end
