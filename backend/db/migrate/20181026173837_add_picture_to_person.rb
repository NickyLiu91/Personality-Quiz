class AddPictureToPerson < ActiveRecord::Migration[5.2]
  def change
    add_column :people, :picture, :string
  end
end
