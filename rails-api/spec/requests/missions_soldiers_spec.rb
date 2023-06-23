require 'rails_helper'

RSpec.describe 'MissionsSoldiers API', type: :request do
  let(:user) { create(:user) }
  let(:headers) { valid_headers }
  let(:soldier) { create(:soldier, user: user) }
  let(:mission) { create(:mission, user: user) }
  let(:missions_soldier) { create(:missions_soldier, mission: mission, soldier: soldier) }
  let(:complete_performance_data) do
    {
      mission_id: mission.id,
      soldier_id: soldier.id,
      hits: 3,
      misses: 1,
      kills: 1,
      was_promoted: true,
      was_KIA: false
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

    let(:body) { complete_performance_data }

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
      let(:body) { complete_performance_data.except(:kills) }

      it { expect(response.status).to eq(422) }
    end

    context 'with a deceased soldier' do
      let(:soldier) { create(:soldier, :no_longer_with_us) }

      it 'does not create the record' do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'PUT /missions_soldiers/:id' do
    before { put "/missions_soldiers/#{missions_soldier.id}", headers: headers, params: params.to_json }
    # Set hits to 99 since that is greater than anything Faker will generate for that field

    let(:params) { { hits: 99 } }

    it 'updates the record' do
      expect(response).to have_http_status(202)
      expect(json['hits']).to eq(99)

      expect(MissionsSoldier.first.hits).to eq(99)
    end

    context 'when a soldier was killed on that mission' do
      let(:params) { { was_KIA: true, misses: 99 } }

      it 'updates the Soldier record as well' do
        recently_deceased_soldier = Soldier.find(missions_soldier.soldier_id)

        expect(recently_deceased_soldier.is_alive).to be(false) # :(
        expect(MissionsSoldier.first.misses).to eq(99)
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
