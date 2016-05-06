class AddResourceCountToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :resource_count, :integer
  end
end
