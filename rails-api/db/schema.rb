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

ActiveRecord::Schema.define(version: 2023_06_23_171424) do

  create_table "missions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
  end

  create_table "missions_soldiers", force: :cascade do |t|
    t.integer "mission_id", null: false
    t.integer "soldier_id", null: false
    t.integer "hits"
    t.integer "misses"
    t.integer "kills"
    t.boolean "was_promoted"
    t.boolean "was_KIA"
    t.integer "exp_gained", default: 0, null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.text "desc"
    t.string "fighter_class"
    t.integer "level"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "skills_soldiers", id: false, force: :cascade do |t|
    t.integer "soldier_id", null: false
    t.integer "skill_id", null: false
    t.index ["soldier_id"], name: "index_skills_soldiers_on_soldier_id"
  end

  create_table "soldiers", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "nationality"
    t.string "gender"
    t.boolean "is_alive"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "nickname"
    t.string "fighter_class"
    t.integer "exp", default: 0, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
