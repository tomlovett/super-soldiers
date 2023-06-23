require 'rails_helper'

RSpec.describe 'MissionsSoldiers API', type: :request do
  let(:user) { create(:user) }
  let(:headers) { valid_headers }
  let(:soldier) { create(:soldier, user: user) }
  let(:mission) { create(:mission, user: user) }
  let(:missions_soldier) { create(:missions_soldier, mission: mission, soldier: soldier) }
  let(:mission_data) do
    {
      mission_id: mission.id,
      soldier_id: soldier.id,
      hits: 3,
      misses: 1,
      kills: 1,
      was_promoted: true,
      was_KIA: false,
      exp_gained: 0
    }
  end

  describe 'GET /missions_soldiers/:id' do
    before { get "/missions_soldiers/#{id}", headers: headers }

    context 'with a valid record' do
      let(:id) { missions_soldier.id }

      it 'returns the record' do
        expect(response).to have_http_status(200)
        expect(json['hits']).to eq(missions_soldier.hits)
        expect(json['mission_id']).to eq(mission.id)
        expect(json['soldier_id']).to eq(soldier.id)
      end
    end

    context 'with an invalid record' do
      let(:id) { 666 }

      it { expect(response.status).to eq(404) }
    end
  end

  describe 'POST /missions_soldiers/:id' do
    before { post '/missions_soldiers/', headers: headers, params: body.to_json }

    let(:body) { mission_data }

    context 'with complete performance data' do
      it 'creates a MissionsSoldier record with the performance data' do
        expect(response).to have_http_status(201)

        missions_soldier = MissionsSoldier.first

        expect(missions_soldier.hits).to eq(3)
        expect(missions_soldier.misses).to eq(1)
        expect(missions_soldier.soldier_id).to eq(soldier.id)
      end
    end

    context 'with incomplete performance data' do
      let(:body) { mission_data.except(:kills) }

      it { expect(response.status).to eq(422) }
    end

    context 'when a soldier was killed on that mission' do
      let(:body) { mission_data.merge({ was_KIA: true, misses: 99 }) }

      it 'updates the Soldier record as well' do
        soldier.reload

        expect(soldier.is_alive).to be(false) # :(
        expect(MissionsSoldier.first.misses).to eq(99)
      end
    end

    context 'when a soldier gains XP and levels up to Corporal' do # checks multiple features
      let(:soldier) { create(:soldier, :squaddie) }
      let(:body) { mission_data.merge({ exp_gained: 150 }) }

      it 'changes the soldiers level and applies a figher class' do
        soldier.reload

        expect(soldier.exp).to eq(150)
        expect(soldier.rank).to eq(Soldier::RANK::Corporal)
        expect(soldier.fighter_class).not_to be_nil
      end
    end

    context 'with a deceased soldier' do
      let(:soldier) { create(:soldier, :no_longer_with_us) }

      it 'does not create the record' do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'DELETE /missions_soldiers/:id' do
    before { delete "/missions_soldiers/#{id}", headers: headers }

    context 'with valid record' do
      let(:id) { missions_soldier.id }

      it 'returns 204' do
        expect(response).to have_http_status(204)
        expect(MissionsSoldier.count).to eq(0)
      end
    end

    context 'with invalid record' do
      let(:id) { 666 }

      it { expect(response).to have_http_status(404) }
    end
  end
end
