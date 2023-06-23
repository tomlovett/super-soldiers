class Soldier < ApplicationRecord
  belongs_to :user
  has_many :missions_soldiers

  validates_presence_of :first_name, :last_name, :nationality, :gender, :exp, :fighter_class

  class FIGHTER_CLASS
    Ranger = "Ranger"
    Grenadier = "Grenadier"
    Specialist = "Specialist"
    Sharpshooter = "Sharpshooter"
    Psi_Operative = "Psi Operative"
  end

  ALL_FIGHTER_CLASSES = [
    FIGHTER_CLASS::Ranger,
    FIGHTER_CLASS::Grenadier,
    FIGHTER_CLASS::Specialist,
    FIGHTER_CLASS::Sharpshooter,
    FIGHTER_CLASS::Psi_Operative,
  ]

  validates_inclusion_of :fighter_class, in: [
    FIGHTER_CLASS::Ranger,
    FIGHTER_CLASS::Grenadier,
    FIGHTER_CLASS::Specialist,
    FIGHTER_CLASS::Sharpshooter,
    FIGHTER_CLASS::Psi_Operative
  ]

  class RANK
    Corporal = "Corporal"
    Sergeant = "Sergeant"
    Lieutenant = "Lieutenant"
    Captain = "Captain"
    Major = "Major"
    Colonel = "Colonel"
  end

  # def to_s
  # 	nickname.present? ? nickname : "#{first_name} #{last_name}"
  # end

  # for backend calculation
  def level
    case exp
    when 0..99
      0
    when 100..249
      1
    when 250..499
      2
    when 500..999
      3
    when 1000..1999
      4
    else
      5
    end
  end

  # returns human-readable string
  def rank
    case level
    when 0
      RANK::Corporal
    when 1
      RANK::Sergeant
    when 2
      RANK::Lieutenant
    when 3
      RANK::Captain
    when 4
      RANK::Major
    else
      RANK::Colonel
    end
  end

  def career_kills
    missions_soldiers.sum(:kills)
  end

  def career_missions
    missions_soldiers.count
  end

  def career_accuracy
    hits = missions_soldiers.sum(:hits)
    misses = missions_soldiers.sum(:misses)

    (100 * hits / (hits + misses)).round
  end
end
