class Api::V1::ScenariosController < ApplicationController
  before_action :find_scenario, only: [:show]
  def index
    @scenarios = Scenario.all
    render json: @scenarios.to_json(only: [:title, :content, :choices, :id, :picture],
      include: [choices: {only: [:content, :id],
        include: [people: {only: [:name, :id, :bio, :picture]}]
    }])
  end

  # def new
  # end
  #
  def show
    # respond_to do |format|
    #   format.html { render :show }
        render json: @scenario.to_json(only: [:title, :content, :choices, :id, :picture],
          include: [choices: {only: [:content, :id],
            include: [people: {only: [:name, :id, :bio, :picture]}]}]
        )
    # end
  end
  #
  # def create
  # end
  #
  # def edit
  # end
  #
  # def update
  # end
  #
  # def delete
  # end
  #
  # private

  def scenarios_params
      params.require(:scenario).permit(:title, :content)
  end

  def find_scenario
    @scenario = Scenario.find(params[:id])
  end
end
