class SkillsSoldier < ApplicationRecord
  belongs_to :skill
  belongs_to :soldier
end
