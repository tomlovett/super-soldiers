require 'rails_helper'

RSpec.describe Mission, type: :model do
  it { should have_and_belong_to_many(:soldiers) }

  it { should validate_presence_of(:name) }
end
