class Api::V1::PeopleController < ApplicationController
  before_action :find_person, only: [:show]
  def index
    @people = Person.all
    render json: @people.to_json(only: [:name, :id, :bio, :picture],
        include: [choices: {only: [:content, :id]
      }]
    )
  end

  # def new
  # end
  #
  def show
    # respond_to do |format|
    #   format.html { render :show }
        render json: @person.to_json(only: [:name, :id, :bio, :picture],
          include: [choices: {only: [:content, :id]}]
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

  def people_params
      params.require(:person).permit(:name)
    end

  def find_person
    @person = Person.find(params[:id])
  end
end
