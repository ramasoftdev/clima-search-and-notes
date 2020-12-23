class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.text :title
      t.text :note_description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
