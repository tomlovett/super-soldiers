# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

complete_skill_tree = [
  { name: 'Slash', level: 1, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Phantom', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Blademaster', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Shadowstrike', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Shadowstep', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Conceal', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Run and Gun', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Implacable', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Bladestorm', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Deep Cover', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Untouchable', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Rapid Fire', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Reaper', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Ranger, desc: 'A skill thingy' },
  { name: 'Squadsight', level: 1, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Long Watch', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Return Fire', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Deadeye', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Lightning Hands', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Death From Above', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Quickdraw', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Kill Zone', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Faceoff', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Steady Hands', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Aim', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Serial', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Fan Fire', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Sharpshooter, desc: 'A skill thingy' },
  { name: 'Launch Grenade', level: 1, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Blast Padding', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Shredder', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Demolition', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Suppression', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Heavy Ordinance', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Holo Targeting', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Volatile Mix', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Chain Shot', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Salvo', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Hail of Bullets', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Saturation of Fire', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Rupture', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Grenadier, desc: 'A skill thingy' },
  { name: 'Hack', level: 1, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Gremlin Cover', level: 1, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Medical Protocol', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Combat Protocol', level: 2, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Revival Protocol', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Haywire Protocol', level: 3, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Field Medic', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Scanning Protocol', level: 4, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Covering Fire', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Threat Assessment', level: 5, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Ever Vigilant', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Guardian', level: 6, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Restoration', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
  { name: 'Capacitor Discharge', level: 7, fighter_class: Soldier::FIGHTER_CLASS::Specialist, desc: 'A skill thingy' },
]

complete_skill_tree.each { |skill| Skill.create!(skill) } if Skill.count == 0

return if Rails.env == "test"

user = User.create(name: 'Commander', email: 'c@work.com', password: 'password', password_confirmation: 'password')

bart = Soldier.create(
  first_name: 'Bart', last_name: 'Chrysler', nationality: 'USA', gender: 'm', is_alive: true, user: user
)
lee = Soldier.create(
  first_name: 'Lee', last_name: 'Syatt', nationality: 'Israel', gender: 'm', is_alive: true, user: user
)
crystal = Soldier.create(
  first_name: 'Christina', last_name: 'P', nationality: 'Poland', gender: 'f', is_alive: true, user: user
)
tommy = Soldier.create(
  first_name: 'Tom', last_name: 'Segura', nickname: 'Tommy Buns', nationality: 'Peru', gender: 'm', is_alive: true, user: user
)
uncle_joey = Soldier.create(
  first_name: 'Joey', last_name: 'Diaz', nickname: 'CoCo', nationality: 'Cuba', gender: 'm', is_alive: true, user: user
)

cool_guy = Mission.create(name: 'Cool Guy', user: user)

base_performance = { hits: 1, misses: 2, kills: 1, exp_gained: 12, was_KIA: false, was_promoted: true }.to_h

bart.add_to_mission(cool_guy, base_performance)
lee.add_to_mission(cool_guy, base_performance)
crystal.add_to_mission(cool_guy, base_performance)
tommy.add_to_mission(cool_guy, base_performance)
uncle_joey.add_to_mission(cool_guy, base_performance)
