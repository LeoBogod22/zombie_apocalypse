class Location < ActiveRecord::Base
  has_many :places
  validates_presence_of :address, :latitude, :longitude
end