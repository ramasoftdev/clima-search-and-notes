class CreateWeatherDetails < ActiveRecord::Migration[6.0]
  def change
    create_table :weather_details do |t|
      t.references :search, null: false, foreign_key: true
      t.decimal :feels_like, precision: 15, scale: 5
      t.decimal :humidity, precision: 15, scale: 5
      t.decimal :pressure, precision: 15, scale: 5
      t.decimal :temp, precision: 15, scale: 5
      t.decimal :temp_max, precision: 15, scale: 5
      t.decimal :temp_min, precision: 15, scale: 5
      t.decimal :wind_speed, precision: 15, scale: 5
      t.string :description

      t.timestamps
    end
  end
end
