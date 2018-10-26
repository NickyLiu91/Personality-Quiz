class Api::V1::UsersController < ApplicationController
  before_action :find_user, only: [:show]
  def index
    @users = User.all
    render json: @users.to_json(only: [:name, :id]
      # include: [choices: {only: [:content],
      #   include: [people: {only: [:name]}]
    )

  end

  # def new
  # end
  #
  def show
    # respond_to do |format|
    #   format.html { render :show }
        render json: @user.to_json(only: [:name, :id]
          # include: [choices: {only: [:content],
          #   include: [people: {only: [:name]}]}]
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

  def users_params
      params.require(:user).permit(:name)
  end

  def find_user
    @user = User.find(params[:id])
  end
end
