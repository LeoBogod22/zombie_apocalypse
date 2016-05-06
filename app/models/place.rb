class Place < ActiveRecord::Base
  belongs_to :location
  enum resource_type: [:other, :weapons, :water, :food, :medicine, :tools, :transportation]
end