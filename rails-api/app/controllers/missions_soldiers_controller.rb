class MissionsSoldiersController < ApplicationController
  before_action :set_missions_soldier, only: [:show, :update, :destroy]

  def index
    @missions_soldiers = MissionsSoldier.where(user: @current_user)
    json_response(@missions_soldiers)
  end

  def show
    json_response(@missions_soldier)
  end

  def create
    return head :unprocessable_entity if soldier_is_deceased?

    @missions_soldier = MissionsSoldier.create!(create_params)
    json_response(@missions_soldier, :created)
  end

  def update
    @missions_soldier.update(update_params)

    register_death_if_applicable

    json_response(@missions_soldier, :accepted)
  end

  def destroy
    @missions_soldier.destroy!
    head :no_content
  end

  private

  def create_params
    params.require(:missions_soldier).permit(
      :mission_id, :soldier_id, :hits, :misses, :kills, :was_promoted, :was_KIA
    )
  end

  def update_params
    params.permit(:hits, :misses, :kills, :was_promoted, :was_KIA)
  end

  def set_missions_soldier
    @missions_soldier = MissionsSoldier.find(params[:id])
  end

  def soldier_is_deceased?
    !Soldier.find(create_params[:soldier_id]).is_alive?
  end

  def register_death_if_applicable
    return unless update_params.has_key?(:was_KIA) && update_params[:was_KIA]

    Soldier.find(@missions_soldier.soldier_id).update!({ is_alive: false }) # o7 :(
  end
end
