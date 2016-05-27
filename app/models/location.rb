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

  # In square kilometers
  def population_density
    url = "http://www.datasciencetoolkit.org/coordinates2statistics/" + latitude + "%2c" + longitude + "?statistics=population_density"

    resp = Faraday.get(url)
    body = JSON.parse(resp.body)

    return body[0]["statistics"]["population_density"]["value"]
  end

  # def square_miles_to_square_kilometers(square_miles)
  #   square_miles * 2.58999
  # end
  #
  # def square_kilometers_to_square_miles (square_kilometers)
  #   square_kilometers * 0.386102
  # end

  def survival?
    # In square kilometers, from https://morrisseyweb.com/2012/03/09/the-average-us-population-density/
    average_population_density = 11011.3345;

    percentage = average_population_density / population_density
  end
end
