require 'rails_helper'

RSpec.describe Mission, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:missions_soldiers) }

  it { should validate_presence_of(:name) }
end
