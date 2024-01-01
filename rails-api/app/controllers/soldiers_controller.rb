class SoldiersController < ApplicationController
  before_action :set_soldier, only: [:show, :update, :destroy]

  def index
    @soldiers = Soldier.all

    json_response(@soldiers.map { |s| s.with_performances })
  end

  def create
    @soldier = Soldier.create!(soldier_params)
    json_response(@soldier, :created)
  end

  def show
    json_response(@soldier.with_performances)
  end

  def update
    @soldier.update(soldier_params)
  end

  def destroy
    @soldier.destroy
    head :no_content
  end

  private

  def soldier_params
    params.permit(:user_id, :first_name, :last_name, :nationality, :gender, :is_alive, :fighter_class)
  end

  def set_soldier
    @soldier = Soldier.find(params[:id])
  end
end
