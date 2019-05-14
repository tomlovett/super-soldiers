require 'rails_helper'

RSpec.describe AuthenticateUser do
  let(:user) { create(:user) }
  let(:valid_auth_obj) { described_class.new(user.email, user.password) }
  let(:invalid_auth_obj) { described_class.new('holey', 'moley') }

  describe '#call' do
    context 'with valid credentials' do
      it 'returns an auth token' do
        token = valid_auth_obj.call
        expect(token).not_to be_nil
      end
    end

    context 'with invalid credentials' do
      it 'raises an authentication error' do
        expect { invalid_auth_obj.call }.to raise_error(ExceptionHandler::AuthenticationError, /Invalid credentials/)
      end
    end
  end
end
