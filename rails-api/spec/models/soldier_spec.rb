require 'rails_helper'

RSpec.describe Soldier, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:missions_soldiers) }

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:nationality) }
  it { should validate_presence_of(:gender) }
  it { should validate_presence_of(:exp) }

  describe '#level and #rank' do
    let(:soldier) { create(:soldier, exp: exp) }
    let(:exp) { 0 }

    context 'with 0 XP' do
      it { expect(soldier.level).to eq(0) }
      it { expect(soldier.rank).to eq(Soldier::RANK::Squaddie) }
      it { expect(soldier.fighter_class).to be_nil } # Class not assigned until Corporal
    end

    context 'with 100-249 XP' do
      let(:exp) { Faker::Number.between(from: 100, to: 249) }

      it { expect(soldier.level).to eq(1) }
			it { expect(soldier.rank).to eq(Soldier::RANK::Corporal) }
			it { expect(soldier.fighter_class).not_to be_nil }
    end

    context 'with 250-499 XP' do
      let(:exp) { Faker::Number.between(from: 250, to: 499) }

      it { expect(soldier.level).to eq(2) }
			it { expect(soldier.rank).to eq(Soldier::RANK::Sergeant) }
    end

    context 'with 500-999 XP' do
      let(:exp) { Faker::Number.between(from: 500, to: 999) }

      it { expect(soldier.level).to eq(3) }
			it { expect(soldier.rank).to eq(Soldier::RANK::Lieutenant) }
    end

    context 'with 1000-1999 XP' do
      let(:exp) { Faker::Number.between(from: 1000, to: 1999) }

      it { expect(soldier.level).to eq(4) }
			it { expect(soldier.rank).to eq(Soldier::RANK::Captain) }
    end

		context 'with 2000-3999 XP' do
      let(:exp) { Faker::Number.between(from: 2000, to: 3999) }

      it { expect(soldier.level).to eq(5) }
			it { expect(soldier.rank).to eq(Soldier::RANK::Major) }
    end

    context 'with >4000 XP' do
      let(:exp) { 4321 }

      it { expect(soldier.level).to eq(6) }
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
