class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name
      t.string :address
      t.integer :type
      t.string :latitude
      t.string :longitude
    end
  end
end
