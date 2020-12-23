class CreatePlaces < ActiveRecord::Migration[6.0]
  def change
    create_table :places do |t|
      t.string :name
      t.string :type_place
      t.string :iso_code
      t.references :place, null: false, foreign_key: true

      t.timestamps
    end
  end
end
