require 'rails_helper'

RSpec.describe 'MissionsSoldiers API', type: :request do
	let(:user) { create(:user) }
	let(:headers) { valid_headers }
	let(:soldier) { create(:soldier, user: user) }
  let(:mission) { create(:mission, user: user) }
	let(:mission_soldier) { create(:missions_soldier, mission: mission, soldier: soldier)}
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
			let(:id) { mission_soldier.id }

			it 'returns the record' do
				expect(response).to have_http_status(200)
				expect(json['hits']).to exist
				expect(json['mission_id']).to eq(mission.id)
				expect(json['soldier_id']).to eq(soldier.id)
			end
		end

		context 'with an invalid record' do
			let(:id) { 666 }

			it { is_expected.to have_http_status(404) }
		end
	end

  describe 'POST /missions_soldiers/:id' do
		before { post '/missions_soldiers/', headers: headers, params: body }

		let(:body) { { mission_id: mission.id, soldier_id: soldier.id } }
		context 'without performance data' do

	    context 'with valid mission and soldier' do
	      it 'creates a record and returns 204' do
	        expect(response).to have_http_status(204)
					expect(MissionsSoldier.count).to eq(1)
	      end
	    end

	    context 'with invalid mission' do
				let(:body) { { mission_id: 666, soldier_id: soldier.id } }

	      it { is_expected.to have_http_status(404) }
	    end

	    context 'with invalid soldier' do
				let(:body) { { mission_id: mission.id, soldier_id: 666 } }

	      it { is_expected.to have_http_status(404) }
	    end
		end

		context 'with complete performance data' do
			let(:body) { complete_performance_data }

			it 'creates a MissionsSoldier record with the performance data' do
				expect(response).to have_http_status(204)

				mission_soldier = MissionSoldier.first

				expect(mission_soldier.hits).to eq(3)
				expect(mission_soldier.misses).to eq(1)
				expect(mission_soldier.soldier_id).to eq(soldier.id)
			end
		end

		# context 'with incomplete performance data' do
		# 	let(:body) { complete_performance_data.except(:kills) }
		# 	it 'returns' do
		# 		# returns bad data
		# 	end
		# end
  end

	describe 'PUT /missions_soldiers/:id' do
		before { put "/missions_soldiers/#{mission_soldier.id}", headers: headers, params: { hits: 99 } }
		# Set hits to 99 since that is greater than anything Faker will generate for that field

		it 'updates the record	' do
			expect(response).to have_http_status(204)

			expect(MissionSoldier.first.hits).to eq(99)
		end
  end

  describe 'DELETE /missions_soldiers/:id' do
    before { delete "/missions_soldiers/#{id}", headers: headers }

    context 'with valid record' do
			let(:id) { mission_soldier.id }

      it 'returns 204' do
        expect(response).to have_http_status(204)
				expect(MissionsSoldiers.count).to eq(0)
      end
    end

    context 'with invalid record' do
      let(:id) { 666 }

      it { is_expected.to have_http_status(404) }
    end
  end

end
