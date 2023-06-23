class MissionsSoldiersController < ApplicationController
  before_action :set_missions_soldier, only: [:show, :destroy]
  before_action :set_soldier, only: [:create]

  def index
    @missions_soldiers = MissionsSoldier.where(user: @current_user)
    json_response(@missions_soldiers)
  end

  def show
    json_response(@missions_soldier)
  end

  def create
    return head :unprocessable_entity if !@soldier.is_alive?

    @missions_soldier = MissionsSoldier.create!(create_params)

    register_death_if_applicable
    apply_experience_to_soldier

    json_response(@missions_soldier, :created)
  end

  def destroy
    @missions_soldier.destroy!
    head :no_content
  end

  private

  def create_params
    params.require(:missions_soldier).permit(
      :mission_id, :soldier_id, :hits, :misses, :kills, :was_promoted, :was_KIA, :exp_gained
    )
  end

  def set_missions_soldier
    @missions_soldier = MissionsSoldier.find(params[:id])
  end

  def set_soldier
    @soldier = Soldier.find(create_params[:soldier_id])
  end

  def apply_experience_to_soldier
    exp_gained = create_params[:exp_gained]
    @soldier.exp += exp_gained

    @soldier.save!

    @soldier.promote if @soldier.earned_promotion?(exp_gained)
  end

  def register_death_if_applicable
    return unless create_params[:was_KIA]

    @soldier.update!({ is_alive: false }) # o7 :(
  end
end
