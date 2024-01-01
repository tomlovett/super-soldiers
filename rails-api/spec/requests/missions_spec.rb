require 'rails_helper'

RSpec.describe 'Missions API', type: :request do
  let(:user) { create(:user) }
  let!(:missions) { create_list(:mission, 10, user: user) }
  let!(:soldier) { create(:soldier, user: user) }
  let!(:soldiers) { create_list(:soldier, 5, user: user) }
  let(:id) { missions.first.id }
  let(:soldier_id) { soldier.id }
  let(:headers) { valid_headers }

  describe 'GET /missions' do
    before { get '/missions', headers: headers }

    it 'returns all missions' do
      expect(json.size).to eq(10)
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /mission/:id' do
    let!(:missions_soldier) { create(:missions_soldier, mission: missions[0], soldier: soldier) }

    before { get "/missions/#{id}", headers: headers }

    context 'with valid mission_id' do
      it 'returns the mission with its missions_soldiers and soldier info' do
        expect(json).not_to be_empty
        expect(json['performances'][0]['id']).to eq(missions_soldier.id)
        expect(json['performances'][0]['soldier_id']).to eq(soldier.id)
      end

      it 'returns 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'with invalid mission_id' do
      let(:id) { 666 }

      it 'returns 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Mission/)
      end
    end
  end

  describe 'POST /mission' do
    let(:valid_attrs) { { name: 'Frozen Tundra', user_id: user.id }.to_json }

    context 'with valid data' do
      before { post '/missions', params: valid_attrs, headers: headers }

      it 'creates a mission' do
        expect(json['name']).to eq('Frozen Tundra')
      end

      it 'returns 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid data' do
      before { post '/missions', params: {}, headers: headers }

      it 'returns a validation error message' do
        expect(response.body).to match(/Name can't be blank/)
      end

      it 'returns 422' do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'PUT /mission/:id' do
    before { put "/missions/#{id}", params: { name: 'Goobleygook' }.to_json, headers: headers }

    it 'updates the record' do
      expect(response.body).to be_empty
    end

    it 'returns 204' do
      expect(response).to have_http_status(204)
    end
  end

  describe 'DELETE /mission/:id' do
    before { delete "/missions/#{id}", headers: headers }

    context 'when the record exists' do
      it 'returns 204' do
        expect(response).to have_http_status(204)
      end
    end

    context 'when the record does not exist' do
      let(:id) { 666 }

      it 'returns 404' do
        expect(response).to have_http_status(404)
      end
    end
  end
end
