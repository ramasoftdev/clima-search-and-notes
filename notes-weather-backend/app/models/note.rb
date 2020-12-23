class Note < ApplicationRecord
  belongs_to :user
  enum status: { active: "Active", deactive: "Deactive" }
  validates :title, presence: true
  validates :note_description, presence: true
end