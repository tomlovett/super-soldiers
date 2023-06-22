require 'rails_helper'

RSpec.describe MissionsSoldier, type: :model do
  it { should belong_to(:mission) }
  it { should belong_to(:soldier) }

  it { should validate_presence_of(:hits) }
  it { should validate_presence_of(:misses) }
  it { should validate_presence_of(:kills) }
  it { should validate_presence_of(:kills) }
  it { should validate_inclusion_of(:was_promoted).in_array([true, false]) }
  it { should validate_inclusion_of(:was_KIA).in_array([true, false]) }
end
