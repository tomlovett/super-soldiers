require 'rails_helper'

RSpec.describe 'Performances API', type: :request do
  let(:user) { create(:user) }
  let(:headers) { valid_headers }
  let(:soldier) { create(:soldier, user: user) }
  let(:mission) { create(:mission, user: user) }
  let(:performance) { create(:performance, mission: mission, soldier: soldier) }
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

  describe 'GET /performances/:id' do
    before { get "/performances/#{id}", headers: headers }

    context 'with a valid record' do
      let(:id) { performance.id }

      it 'returns the record' do
        expect(response).to have_http_status(200)
        expect(json['hits']).to eq(performance.hits)
        expect(json['mission_id']).to eq(mission.id)
        expect(json['soldier_id']).to eq(soldier.id)
      end
    end

    context 'with an invalid record' do
      let(:id) { 666 }

      it { expect(response.status).to eq(404) }
    end
  end

  describe 'POST /performances/:id' do
    before { post '/performances/', headers: headers, params: body.to_json }

    let(:body) { mission_data }

    context 'with complete performance data' do
      it 'creates a Performance record with the performance data' do
        expect(response).to have_http_status(201)

        performance = Performance.first

        expect(performance.hits).to eq(3)
        expect(performance.misses).to eq(1)
        expect(performance.soldier_id).to eq(soldier.id)
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
        expect(Performance.first.misses).to eq(99)
      end
    end

    context 'when a soldier gains XP and levels up to Corporal' do # checks multiple features
      let(:soldier) { create(:soldier, :squaddie) }
      let(:body) { mission_data.merge({ exp_gained: 150 }) }

      it 'changes the soldiers level and applies a figher class' do
        soldier.reload

        expect(soldier.exp).to eq(150)
        expect(soldier.rank).to eq(Soldier::RANK::Squaddie)
        expect(soldier.skills.count).to eq(1)
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

  describe 'DELETE /performances/:id' do
    before { delete "/performances/#{id}", headers: headers }

    context 'with valid record' do
      let(:id) { performance.id }

      it 'returns 204' do
        expect(response).to have_http_status(204)
        expect(Performance.count).to eq(0)
      end
    end

    context 'with invalid record' do
      let(:id) { 666 }

      it { expect(response).to have_http_status(404) }
    end
  end
end
