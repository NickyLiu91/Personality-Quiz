class AddPictureToSenario < ActiveRecord::Migration[5.2]
  def change
    add_column :scenarios, :picture, :string
  end
end
