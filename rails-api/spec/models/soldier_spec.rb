require 'rails_helper'

RSpec.describe Soldier, type: :model do
  it { should have_and_belong_to_many(:missions) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:nationality) }
  it { should validate_presence_of(:gender) }
  it { should validate_presence_of(:is_alive) }
end
