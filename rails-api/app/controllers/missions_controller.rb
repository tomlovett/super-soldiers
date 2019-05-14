class MissionsController < ApplicationController
  before_action :set_mission, only: [:show, :update, :destroy, :add_soldier, :remove_soldier]
  before_action :set_soldier, only: [:add_soldier, :remove_soldier]

  def index
    @missions = Mission.all
    json_response(@missions)
  end

  def show
    json_response(@mission)
  end

  def create
    @mission = Mission.create!(mission_params)
    json_response(@mission, :created)
  end

  def update
    @mission.update(mission_params)
  end

  def destroy
    @mission.destroy
    head :no_content
  end

  def add_soldier
    @mission.soldiers << @soldier
  end

  def remove_soldier
    @mission.soldiers.delete(@soldier)
    head :no_content
  end

  private

  def mission_params
    params.permit(:name)
  end

  def set_mission
    @mission = Mission.find(params[:id])
  end

  def set_soldier
    @soldier = Soldier.find(params[:soldier_id])
  end

end
