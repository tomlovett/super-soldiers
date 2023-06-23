FactoryBot.define do
  factory :missions_soldier do
    hits { Faker::Number.digit }
    misses { Faker::Number.digit }
    kills { Faker::Number.digit }
    was_promoted { Faker::Boolean.boolean }
    was_KIA { Faker::Boolean.boolean }

    mission
    soldier
  end
end
