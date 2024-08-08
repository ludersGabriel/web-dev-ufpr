# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_08_154950) do
  create_table "battles", force: :cascade do |t|
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pokemon_battles", force: :cascade do |t|
    t.integer "pokemon_id"
    t.integer "battle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_pokemon_battles_on_battle_id"
    t.index ["pokemon_id"], name: "index_pokemon_battles_on_pokemon_id"
  end

  create_table "pokemons", force: :cascade do |t|
    t.string "name"
    t.string "poke_type"
    t.integer "level"
    t.integer "trainer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trainer_profiles", force: :cascade do |t|
    t.string "hometown"
    t.string "favorite_pokemon"
    t.integer "trainer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["trainer_id"], name: "index_trainer_profiles_on_trainer_id", unique: true
  end

  create_table "trainers", force: :cascade do |t|
    t.string "name"
    t.integer "age"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "role", default: "user", null: false
  end

  add_foreign_key "pokemon_battles", "battles", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pokemon_battles", "pokemons", on_update: :cascade, on_delete: :cascade
  add_foreign_key "pokemons", "trainers", on_update: :cascade, on_delete: :cascade
  add_foreign_key "trainer_profiles", "trainers", on_update: :cascade, on_delete: :cascade
end
