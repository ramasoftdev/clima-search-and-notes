# require 'csv'
# require 'httparty'

# csv_text = File.read('db/seeds/places/world-cities.csv')
# csv = CSV.parse(csv_text, :headers => true)
# i = 0
# country = ""
# apha_code = ""
# csv.each do |row|
    # i = i + 1
    # if country != row.to_hash['country'].gsub(' ','%20')
    #     p "Entre aqui"
    #     country = row.to_hash['country'].gsub(' ','%20')
    #     response = HTTParty.get("https://restcountries.eu/rest/v2/name/#{country}")
    #     apha_code = response.first.dig('alpha2Code')
    # end
    # p "Country #{country} Alpha Code #{apha_code}"
    # country_id = Places.find_or_create_by(name: row.to_hash['country'], type_place: 'Country', iso_code: apha_code)
    # Place.create!(name: row.to_hash['name'], type_place: 'City')
    # break if i == 5
# end
place_1 = Place.create!(name: "Country Test", type_place: "Country", iso_code: "Country-Test")
place_2 = Place.create!(name: "City Test", type_place: "City", iso_code: "City-Test", place_id: place_1.id)
