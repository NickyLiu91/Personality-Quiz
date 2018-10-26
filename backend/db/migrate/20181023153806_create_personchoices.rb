class CreatePersonchoices < ActiveRecord::Migration[5.2]
  def change
    create_table :personchoices do |t|
      t.integer :person_id
      t.integer :choice_id
      t.timestamps
    end
  end
end
