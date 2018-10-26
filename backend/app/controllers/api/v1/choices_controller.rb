class Api::V1::ChoicesController < ApplicationController
  before_action :find_choice, only: [:show]
  def index
    @choices = Choice.all
    render json: @choices.to_json(only: [:content, :id],
      include: [people: {only: [:name, :id, :bio, :picture]}]
    )
  end

  # def new
  # end
  #
  def show
    # respond_to do |format|
    #   format.html { render :show }
        render json: @choice.to_json(only: [:content, :id],
          include: [people: {only: [:name, :id, :bio, :picture]}]
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

  def choice_params
    params.require(:choice).permit(:content, :scenario_id)
  end

  def find_choice
    @choice = Choice.find(params[:id])
  end
end
