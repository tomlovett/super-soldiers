FactoryBot.define do
  factory :performance do
    hits { Faker::Number.digit }
    misses { Faker::Number.digit }
    kills { Faker::Number.digit }
    was_promoted { Faker::Boolean.boolean }
    was_KIA { Faker::Boolean.boolean }
    exp_gained { Faker::Number.digit * 10 }

    mission
    soldier
  end
end
