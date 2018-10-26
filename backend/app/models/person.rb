class Person < ApplicationRecord
  has_many :personchoices
  has_many :choices, through: :personchoices
end
