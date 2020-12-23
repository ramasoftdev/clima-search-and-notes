# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_22_175842) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jwt_blacklist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["jti"], name: "index_jwt_blacklist_on_jti"
  end

  create_table "notes", force: :cascade do |t|
    t.text "title"
    t.text "note_description"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "status", default: "Active"
    t.index ["user_id"], name: "index_notes_on_user_id"
  end

  create_table "places", force: :cascade do |t|
    t.string "name"
    t.string "type_place"
    t.string "iso_code"
    t.bigint "place_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["place_id"], name: "index_places_on_place_id"
  end

  create_table "searches", force: :cascade do |t|
    t.bigint "place_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["place_id"], name: "index_searches_on_place_id"
    t.index ["user_id"], name: "index_searches_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "username"
    t.string "jti"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "weather_details", force: :cascade do |t|
    t.bigint "search_id", null: false
    t.decimal "feels_like", precision: 15, scale: 5
    t.decimal "humidity", precision: 15, scale: 5
    t.decimal "pressure", precision: 15, scale: 5
    t.decimal "temp", precision: 15, scale: 5
    t.decimal "temp_max", precision: 15, scale: 5
    t.decimal "temp_min", precision: 15, scale: 5
    t.decimal "wind_speed", precision: 15, scale: 5
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["search_id"], name: "index_weather_details_on_search_id"
  end

  add_foreign_key "notes", "users"
  add_foreign_key "places", "places"
  add_foreign_key "searches", "places"
  add_foreign_key "searches", "users"
  add_foreign_key "weather_details", "searches"
end
