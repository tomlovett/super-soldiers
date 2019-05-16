# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: 'Commander', email: 'c@work.com', password: 'pass', password_confirmation: 'pass')

bart = Soldier.create(first_name: 'Bart', last_name: 'Chrysler', nationality: 'USA', gender: 'm', is_alive: true, user: user)
lee = Soldier.create(first_name: 'Lee', last_name: 'Syatt', nationality: 'Israel', gender: 'm', is_alive: true, user: user)
crystal = Soldier.create(first_name: 'Christina', last_name: 'P', nationality: 'Poland', gender: 'f', is_alive: true, user: user)
tommy = Soldier.create(first_name: 'Tom', last_name: 'Segura', nationality: 'Peru', gender: 'm', is_alive: true, user: user)
uncle_joey = Soldier.create(first_name: 'Joey', last_name: 'Diaz' , nationality: 'Cuba', gender: 'm', is_alive: true, user: user)

cool_guy = Mission.create(name: 'Cool Guy', user: user)
cool_guy.soldiers << bart
cool_guy.soldiers << lee
cool_guy.soldiers << crystal
cool_guy.soldiers << tommy

try_it_out = Mission.create(name: 'Try It Out', user: user)
try_it_out.soldiers << tommy
try_it_out.soldiers << crystal
try_it_out.soldiers << uncle_joey
try_it_out.soldiers << bart
