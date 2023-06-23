FactoryBot.define do
  factory :soldier do
    user
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    nationality { Faker::Address.country }
    gender { Faker::Gender.binary_type }
    exp { Faker::Number.between(from: 0, to: 4100) }
    fighter_class { Soldier::ALL_FIGHTER_CLASSES.sample }
    is_alive { true }

    after :create do |s|
      # Squaddies do not have classes
      s.fighter_class = nil if s.exp < 100
    end

    trait :no_longer_with_us do
      is_alive { false } # :( o7
    end

    trait :squaddie do
      exp { 0 }
    end
  end
end
