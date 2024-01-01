require 'rails_helper'

RSpec.describe Mission, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:performances) }

  it { should validate_presence_of(:name) }

  describe '#with_performances' do
    let(:mission) { create(:mission) }

    before { 4.times { create(:performance, mission: mission) } }

    it 'returns the soldier object with an array of thier missions' do
      data_obj = mission.with_performances

      expect(data_obj['id']).to eq(mission.id)
      expect(data_obj[:performances].count).to eq(4)
      expect(data_obj[:performances][0][:hits]).not_to be_nil
    end
  end
end
