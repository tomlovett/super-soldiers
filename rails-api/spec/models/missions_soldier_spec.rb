require 'rails_helper'

RSpec.describe MissionsSoldier, type: :model do
  it { should belong_to(:mission) }
  it { should belong_to(:soldier) }

  it { should validate_presence_of(:hits) }
  it { should validate_presence_of(:misses) }
  it { should validate_presence_of(:kills) }
  it { should validate_presence_of(:kills) }
end
