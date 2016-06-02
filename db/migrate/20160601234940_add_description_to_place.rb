class AddDescriptionToPlace < ActiveRecord::Migration
  def change
    add_column :places, :description, :string
  end
end
