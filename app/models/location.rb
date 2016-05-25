class Location < ActiveRecord::Base
  has_many :places
  validates_presence_of :address, :latitude, :longitude

  def resource_ids
    places.pluck(:resource_type).uniq
  end

  def resource_strings
    places.map { |p| p.resource_type }.uniq
  end

  def resources_count
    resource_types = resource_ids

    resource_types.map { |resource| places.where(resource_type: resource).inject(0){|sum, r| sum + r.resource_count}}
  end
end
