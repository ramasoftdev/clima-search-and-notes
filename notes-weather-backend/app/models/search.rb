class Search < ApplicationRecord
  belongs_to :place
  belongs_to :user, optional: true
  has_many :weather_details
  attr_accessor :city_name
  attr_accessor :weather_detail

  validates_presence_of :city_name

  after_create :create_weather_details
  before_destroy :destroy_details

  private
    def create_weather_details
      weather_detail = self.weather_details.build(temp: self.weather_detail['main']['temp'],
                                                  feels_like: self.weather_detail['main']['feels_like'],
                                                  temp_min: self.weather_detail['main']['temp_min'],
                                                  temp_max: self.weather_detail['main']['temp_max'],
                                                  pressure: self.weather_detail['main']['pressure'],
                                                  humidity: self.weather_detail['main']['humidity'],
                                                  wind_speed: self.weather_detail['wind']['speed'],
                                                  description: self.weather_detail['weather'][0]['description'])
      if weather_detail.save
        return weather_detail
      else
        return weather_detail.error
      end
    end

    def destroy_details
      begin
        WeatherDetail.where(search_id: self.id).delete_all
      rescue => exception
        self.error = 'Cannot destroy Weather Detail'
        return false
      end
    end
    
end
