class Api::SearchesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_search, only: [:show, :destroy]
  before_action :set_weather_search, only: [:create]
  require "weather_search"

  def index
    searches = renderize_json({ page: params[:page], per_page: params[:per_page] })
    render json: { searches: searches, page: searches.current_page, pages: searches.total_pages }
  end

  def create
    Search.transaction do
      begin
        search = current_user.searches.build(search_params)
        place ||= Place.find(search.place_id) rescue Place.where(name: search_params["city_name"]).first rescue nil
        search.place_id = place.id
        search.weather_detail = @weather_search.search_weather_detail(place.name)
        if search.save
          searches = renderize_json({ page: params[:page], per_page: params[:per_page] })
          render json: { searches: searches, page: searches.current_page, pages: searches.total_pages, message: "Searched Updated Succefully" }, status: 201
        else
          render json: { errors: [{ status: :bad_request, title: "Bad Request", message: search.errors, code: "100" }] }, status: :bad_request
        end
      rescue => e
        render json: { errors: [{ status: :bad_request, title: "Bad Request", message: e.message.to_s, code: "100" }] }, status: :bad_request
      end
    end
  end

  def show
    render json: { search: @search, weather_details: @search_params.weather_details.first(10) }, status: 201
  end

  def destroy
    Search.transaction do
      if @search.destroy
        searches = renderize_json({ page: params[:page], per_page: params[:per_page] })
        render json: { searches: searches, page: searches.current_page, pages: searches.total_pages, message: "Searched Deleted Succefully" }, status: 201
      else
        head :unprocessable_entity, error: @search.errors.messages, status: 442
      end
    end
  end

  def get_places
    places = Place.where(type_place: "City").pluck(:id, :name).map { |key, val| { id: key, name: val } }
    render json: places
  end

  private

  def set_search
    @search = Search.find(params[:id])
  end

  def search_params
    params.require(:search).permit(:city_name, :place_id, :page, :per_page, :message, :status)
  end

  def set_weather_search
    @weather_search = WeatherSearch.new
  end

  def renderize_json(myparams)
    searches = set_search_with_pagination(myparams)
    while searches.length < 1 && current_user.searches.count > 1
      myparams[:page] = (myparams[:page].to_i - 1).to_s
      searches = set_search_with_pagination(myparams)
    end
    return searches
  end

  def set_search_with_pagination(myparams)
    return Search.distinct.all.select("searches.id, searches.place_id, strftime('%m-%d-%Y %H:%M:%S',
                                      searches.created_at) AS search_created_at, P.name AS place_name, WD.*")
                 .joins("LEFT JOIN places P ON searches.place_id = P.id")
                 .joins("LEFT JOIN weather_details WD ON searches.id = WD.search_id")
                 .joins("LEFT JOIN users U ON searches.user_id = U.id")
                 .where("U.id = ?", current_user.id)
                 .order(created_at: :DESC).paginate(myparams)
  end
end

# search.weather_detail = {
#   "main" => {
#     "temp" => 0.2829e2,
#     "feels_like" => 0.3167e2,
#     "temp_min" => 0.2722e2,
#     "temp_max" => 0.3e2,
#     "pressure" => 0.1012e4,
#     "humidity" => 0.7e2
#   },
#   "wind" => {
#     "speed" => 2.1
#   },
#   "weather" => [
#     {
#       "description" => "broken clouds"
#     }
#   ]
# }