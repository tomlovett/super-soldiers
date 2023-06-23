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
    @missions_soldier = MissionsSoldier.create!(create_params)
    json_response(@missions_soldier, :created)
  end

  def update
    @missions_soldier.update(update_params)
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
end
