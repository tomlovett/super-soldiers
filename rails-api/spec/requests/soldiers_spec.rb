require 'rails_helper'

RSpec.describe 'Soldiers API', type: :request do
  let(:user) { create(:user) }
  let!(:soldiers) { create_list(:soldier, 10, user: user) }
  let(:id) { soldiers.first.id }

  describe 'GET /soldiers' do
    before { get '/soldiers', params: {}, headers: valid_headers }

    let!(:other_soldier) { create(:soldier) }

    it 'returns soldiers' do
      expect(response).to have_http_status(200)

      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end
  end

  describe 'GET /soldiers/:id' do
    before { get "/soldiers/#{id}", params: {}, headers: valid_headers }

    context 'when the record exists' do
      it 'returns the soldier' do
        expect(response).to have_http_status(200)

        expect(json).not_to be_empty
        expect(json['id']).to eq(id)
      end
    end

    context 'when the record does not exist' do
      let(:id) { 666 }

      it 'returns 404' do
        expect(response).to have_http_status(404)
        expect(response.body).to match(/Couldn't find Soldier/)
      end
    end
  end

  describe 'POST /soldiers' do
    let(:valid_attrs) do
      {
        first_name: 'Mahatma',
        last_name: 'Gandhi',
        nationality: 'India',
        gender: 'm',
        is_alive: true,
        fighter_class: Soldier::ALL_FIGHTER_CLASSES.sample,
        user_id: user.id
      }.to_json
    end

    context 'with valid data' do
      before { post '/soldiers', params: valid_attrs, headers: valid_headers }

      it 'creates a soldier' do
        expect(response).to have_http_status(201)
        expect(json['last_name']).to eq('Gandhi')
      end
    end

    context 'with invalid data' do
      before { post '/soldiers', params: {}, headers: valid_headers }

      it 'returns a validation failure message' do
        expect(response.body).to match(/First name can't be blank/)
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'PUT /soldiers/:id' do
    let(:valid_attrs) { { first_name: 'Mohandas' }.to_json }

    context 'when the record exists' do
      before { put "/soldiers/#{id}", params: valid_attrs, headers: valid_headers }

      it 'updates the record' do
        expect(response).to have_http_status(204)
        expect(response.body).to be_empty
      end
    end
  end

  describe 'DELETE /soldiers/:id' do
    before { delete "/soldiers/#{id}", headers: valid_headers }

    context 'when the record exists' do
      it { expect(response).to have_http_status(204) }
    end

    context 'when the record does not exist' do
      let(:id) { 666 }

      it { expect(response).to have_http_status(404) }
    end
  end
end
