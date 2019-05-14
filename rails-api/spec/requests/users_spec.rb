require 'rails_helper'

RSpec.describe 'Users API', type: :request do
  let!(:user) { build(:user) }
  let(:headers) { valid_headers.except('Authorization') }
  let(:valid_attrs) {
    {
      name: 'Ozzy Osbourne',
      email: 'ozzy@ozzy.com',
      password: 'tastybats',
      password_confirmation: 'tastybats'
    }
  }

  describe 'POST /signup' do
    context 'with valid request' do
      before { post '/signup', params: valid_attrs.to_json, headers: headers }

      it 'creates a new user' do
        expect(response).to have_http_status(201)
      end

      it 'returns success message' do
        expect(json['message']).to match(/Account created successfully/)
      end

      it 'returns an auth token' do
        expect(json['auth_token']).not_to be_nil
      end
    end

    context 'with invalid request' do
      before { post '/signup', params: {}, headers: headers }

      it 'does not create a new user' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(json['message']).to match(/Validation failed: Password can't be blank, Name can't be blank, Email can't be blank, Password digest can't be blank/)
      end
    end
  end
end
