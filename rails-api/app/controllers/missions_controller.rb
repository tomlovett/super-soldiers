class MissionsController < ApplicationController
  before_action :set_mission, only: [:show, :update, :destroy]

  def index
    @missions = Mission.where(user: @current_user)
    json_response(@missions.map { |m| m.with_mission_performances })
  end

  def show
    json_response(@mission.with_mission_performances)
  end

  def create
    @mission = Mission.create!(mission_params.merge({ user_id: @current_user.id }))
    json_response(@mission, :created)
  end

  def update
    @mission.update(mission_params)
  end

  def destroy
    @mission.destroy
    head :no_content
  end

  private

  def mission_params
    params.permit(:user_id, :name)
  end

  def set_mission
    @mission = Mission.find(params[:id])
  end
end
