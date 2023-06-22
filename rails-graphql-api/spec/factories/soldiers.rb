FactoryBot.define do
  factory :soldier do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    nationality { Faker::Address.country }
    gender { Faker::Gender.binary_type }
    is_alive { true }
  end
end
