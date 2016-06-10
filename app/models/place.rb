class Place < ActiveRecord::Base
  belongs_to :location
  validates_presence_of :location_id, :name, :address, :latitude, :longitude, :resource_type, :resource_count, :description
  enum resource_type: [:weapons, :water, :food, :medicine, :tools, :transportation, :other]
end
