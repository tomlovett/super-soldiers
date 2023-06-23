FactoryBot.define do
  factory :mission do
    name { Faker::Creature::Dog.breed }

		user
  end
end
