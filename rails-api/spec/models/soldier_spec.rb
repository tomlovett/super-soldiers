require 'rails_helper'

RSpec.describe Soldier, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:missions_soldiers) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:nationality) }
  it { should validate_presence_of(:gender) }
  it { should validate_presence_of(:exp) }
  it { should validate_presence_of(:fighter_class) }
  it { should validate_inclusion_of(:fighter_class).in_array(Soldier::ALL_FIGHTER_CLASSES) }

  describe '#level and #rank' do
    let(:soldier) { create(:soldier, exp: exp) }
    let(:exp) { 0 }

    context 'with 0 XP' do
      it { expect(soldier.level).to eq(0) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Corporal) }
    end

    context 'with 100-249 XP' do
      let(:exp) { Faker::Number.between(from: 100, to: 249) }

      it { expect(soldier.level).to eq(1) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Sergeant) }
    end

    context 'with 250-499 XP' do
      let(:exp) { Faker::Number.between(from: 250, to: 499) }

      it { expect(soldier.level).to eq(2) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Lieutenant) }
    end

    context 'with 500-999 XP' do
      let(:exp) { Faker::Number.between(from: 500, to: 999) }

      it { expect(soldier.level).to eq(3) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Captain) }
    end

    context 'with 1000-1999 XP' do
      let(:exp) { Faker::Number.between(from: 1000, to: 1999) }

      it { expect(soldier.level).to eq(4) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Major) }
    end

    context 'with >2000 XP' do
      let(:exp) { 2134 }

      it { expect(soldier.level).to eq(5) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Colonel) }
    end
  end

  # describe '#career_kills' do
  #
  # end
  #
  # describe '#career_missions' do
  #
  # end
  #
  # describe '#career_accuracy' do
  #
  # end
end
