class AddExpDateCreatedAtAndUpdatedAtToJwtBlacklist < ActiveRecord::Migration[6.0]
  def change
    add_column :jwt_blacklist, :exp, :datetime
    add_column :jwt_blacklist, :created_at, :datetime
    add_column :jwt_blacklist, :updated_at, :datetime
  end
end
