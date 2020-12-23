class Place < ApplicationRecord
  belongs_to :place, optional: true
  has_many :searches

  validates_presence_of :name, :type_place
  validates :type_place, inclusion: { in: %w(City Country)}
  validate :valid_city, :valid_country
  validates :place_id, numericality: {allow_blank: true}

  private
  def valid_city
    if type_place == 'City' && place_id.nil?
      errors.add(:place_id, "City doesn't have Country")
    end
  end
  def valid_country
    if type_place == 'Country' && !place_id.nil?
      errors.add(:place_id, "Country can't have a place_id")
    end
  end
end
