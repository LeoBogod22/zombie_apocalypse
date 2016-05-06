class RenameTypeForPlaces < ActiveRecord::Migration
  def change
    rename_column :places, :type, :resource_type
  end
end
