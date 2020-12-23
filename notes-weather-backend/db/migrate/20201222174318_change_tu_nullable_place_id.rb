class ChangeTuNullablePlaceId < ActiveRecord::Migration[6.0]
  def change
    change_column :places, :place_id, :bigint, :null => true
  end
end
