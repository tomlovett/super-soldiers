class PerformancesController < ApplicationController
  before_action :set_performance, only: [:show, :destroy]
  before_action :set_soldier, only: [:create]

  def index
    @performances = Performance.where(user: @current_user)
    json_response(@performances)
  end

  def show
    json_response(@performance)
  end

  def create
    return head :unprocessable_entity if !@soldier.is_alive?

    @performance = Performance.create!(create_params)

    register_death_if_applicable
    apply_experience_to_soldier

    json_response(@performance, :created)
  end

  def destroy
    @performance.destroy!
    head :no_content
  end

  private

  def create_params
    params.require(:performance).permit(
      :mission_id, :soldier_id, :hits, :misses, :kills, :was_promoted, :was_KIA, :exp_gained
    )
  end

  def set_performance
    @performance = Performance.find(params[:id])
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
