require 'rails_helper'

RSpec.describe 'Soldiers API', type: :request do
  let(:user) { create(:user) }
  let!(:soldiers) { create_list(:soldier, 10, user: user) }
  let(:id) { soldiers.first.id }
  let(:headers) { valid_headers }

  describe 'GET /soldiers' do
    before { get '/soldiers', params: {}, headers: headers }

    # TODO: It returns all soldiers for the given user
    it 'returns soldiers' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /soldiers/:id' do
    before { get "/soldiers/#{id}", params: {}, headers: headers }

    context 'when the record exists' do
      it 'returns the soldier' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(id)
      end

      it 'returns 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:id) { 666 }

      it 'returns 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Soldier/)
      end
    end
  end

  describe 'POST /soldiers' do
    let(:valid_attrs) { {first_name: 'Mahatma', last_name: 'Gandhi', nationality: 'India', gender: 'm', is_alive: true, user_id: user.id }.to_json }

    context 'with valid data' do
      before { post '/soldiers', params: valid_attrs, headers: headers }

      it 'creates a soldier' do
        expect(json['last_name']).to eq('Gandhi')
      end

      it 'returns 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'with invalid data' do
      before { post '/soldiers', params: {}, headers: headers }

      it 'returns 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/First name can't be blank/)
      end
    end
  end

  describe 'PUT /soldiers/:id' do
    let(:valid_attrs) { { first_name: 'Mohandas' }.to_json }

    context 'when the record exists' do
      before { put "/soldiers/#{id}", params: valid_attrs, headers: headers }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns 204' do
        expect(response).to have_http_status(204)
      end
    end

  end

  describe 'DELETE /soldiers/:id' do
    before { delete "/soldiers/#{id}", headers: headers }

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
