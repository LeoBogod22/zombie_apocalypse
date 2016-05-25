class Place < ActiveRecord::Base
  belongs_to :location
  validates_presence_of :name, :address, :latitude, :longitude, :resource_type, :resource_count, :location_id
  enum resource_type: [:other, :weapons, :water, :food, :medicine, :tools, :transportation]
end
