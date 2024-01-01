require 'rails_helper'

RSpec.describe Soldier, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:missions_soldiers) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:nationality) }
  it { should validate_presence_of(:gender) }
  it { should validate_presence_of(:exp) }

  describe '#with_mission_performances' do
    let(:soldier) { create(:soldier) }

    before do
      4.times do
        mission = create(:mission)
        create(:missions_soldier, soldier: soldier, mission: mission)
      end
    end

    it 'returns the soldier object with an array of thier missions' do
      data_obj = soldier.with_mission_performances

      expect(data_obj['id']).to eq(soldier.id)
      expect(data_obj[:performances].count).to eq(4)
      expect(data_obj[:performances][0][:hits]).not_to be_nil
    end
  end

  describe '#add_to_mission' do
    let(:soldier) { create(:soldier) }
    let(:mission) { create(:mission) }
    let(:performance) do
      {
        hits: 1,
        misses: 2,
        kills: 1,
        exp_gained: 11,
        was_KIA: false,
        was_promoted: true
      }.to_h
    end

    context 'with valid data' do
      it 'creates a new MissionsSoldier record' do
        soldier.add_to_mission(mission, performance)

        expect(MissionsSoldier.where(soldier: soldier, mission: mission).count).to eq(1)

        missions_soldier = MissionsSoldier.take

        expect(missions_soldier.mission.id).to eq(mission.id)
        expect(missions_soldier.soldier.id).to eq(soldier.id)
        expect(missions_soldier.hits).to eq(1)
        expect(missions_soldier.was_promoted).to be(true)
      end
    end
  end

  describe '#level and #rank' do
    let(:soldier) { create(:soldier, exp: exp) }
    let(:exp) { 0 }

    context 'with 0 XP' do
      it { expect(soldier.level).to eq(0) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Rookie) }
      it { expect(soldier.fighter_class).to be_nil } # Class not assigned until Corporal
    end

    context 'with 100-249 XP' do
      let(:exp) { Faker::Number.between(from: 100, to: 249) }

      it { expect(soldier.level).to eq(1) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Squaddie) }
      it { expect(soldier.fighter_class).not_to be_nil }
    end

    context 'with 250-499 XP' do
      let(:exp) { Faker::Number.between(from: 250, to: 499) }

      it { expect(soldier.level).to eq(2) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Corporal) }
    end

    context 'with 500-999 XP' do
      let(:exp) { Faker::Number.between(from: 500, to: 999) }

      it { expect(soldier.level).to eq(3) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Sergeant) }
    end

    context 'with 1000-1999 XP' do
      let(:exp) { Faker::Number.between(from: 1000, to: 1999) }

      it { expect(soldier.level).to eq(4) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Lieutenant) }
    end

    context 'with 2000-3999 XP' do
      let(:exp) { Faker::Number.between(from: 2000, to: 3999) }

      it { expect(soldier.level).to eq(5) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Captain) }
    end

    context 'with 4000-7999 XP' do
      let(:exp) { Faker::Number.between(from: 4000, to: 7999) }

      it { expect(soldier.level).to eq(6) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Major) }
    end

    context 'with >4000 XP' do
      let(:exp) { 9321 }

      it { expect(soldier.level).to eq(7) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Colonel) }
    end
  end

  describe '#career_kills' do
    let(:soldier) { create(:soldier) }

    context 'with zero missions' do
      it { expect(soldier.career_kills).to eq(0) }
    end

    context 'with no kills from missions' do
      let!(:missions_soldiers) { create_list(:missions_soldier, 4, soldier: soldier, kills: 0) }

      it { expect(soldier.career_kills).to eq(0) }
    end

    context 'with kills from one mission' do
      let!(:missions_soldier) { create(:missions_soldier, soldier: soldier, kills: 3) }

      it { expect(soldier.career_kills).to eq(3) }
    end

    context 'with kills from multiple missions' do
      let!(:missions_soldier) { create_list(:missions_soldier, 2, soldier: soldier, kills: 3) }

      it { expect(soldier.career_kills).to eq(6) }
    end
  end

  describe '#career_missions' do
    let(:soldier) { create(:soldier) }

    context 'with zero missions' do
      it { expect(soldier.career_missions).to eq(0) }
    end

    context 'with multiple missions' do
      let!(:missions_soldier) { create_list(:missions_soldier, 2, soldier: soldier) }

      it { expect(soldier.career_missions).to eq(2) }
    end
  end
end
