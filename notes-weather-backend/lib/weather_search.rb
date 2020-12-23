require "rest-client"

class WeatherSearch
  def initialize()
    @base_url = "https://api.openweathermap.org/data/2.5/weather?"
    @units = "metric"
    @appid = Rails.application.credentials.app_id_weather
  end

  def search_weather_detail(city_name)
    url = "#{@base_url}q=#{city_name}&units=#{@units}&appid=#{@appid}"
    begin
      response = RestClient.get(url)
      JSON.parse(response.body)
    rescue RestClient::ExceptionWithResponse => e
      e.response
    end
  end
end