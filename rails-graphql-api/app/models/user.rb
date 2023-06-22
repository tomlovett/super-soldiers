class User < ApplicationRecord
  has_secure_password

  has_many :missions
  has_many :soldiers

  validates_presence_of :name, :email, :password_digest
end
