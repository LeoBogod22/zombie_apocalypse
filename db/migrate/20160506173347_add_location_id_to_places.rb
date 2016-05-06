class AddLocationIdToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :location_id, :integer 
  end
end
