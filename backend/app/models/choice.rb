class Choice < ApplicationRecord
  belongs_to :scenario
  has_many :personchoices
  has_many :people, through: :personchoices
  # belongs_to :user
end
