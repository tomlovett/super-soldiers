FactoryBot.define do
  factory :mission do
    name { Faker::Creature::Dog.breed }
  end
end
