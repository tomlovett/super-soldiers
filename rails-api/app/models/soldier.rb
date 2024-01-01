class Soldier < ApplicationRecord
  belongs_to :user
  has_many :missions_soldiers
  has_and_belongs_to_many :skills

  validates_presence_of :first_name, :last_name, :nationality, :gender, :exp

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

  class RANK
    Rookie = "Rookie"
    Squaddie = "Squaddie"
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

  def with_mission_performances
    missions_soldiers = MissionsSoldier.where(soldier: self)

    attributes.merge({ performances: missions_soldiers }).to_h
  end

  def add_to_mission(mission, performance)
    MissionsSoldier.create!(
      mission: mission,
      soldier: self,
      hits: performance[:hits],
      misses: performance[:misses],
      kills: performance[:kills],
      exp_gained: performance[:exp_gained],
      was_promoted: performance[:was_promoted] || false,
      was_KIA: performance[:was_KIA] || false
    )
  end

  # for backend calculation
  def level
    exp_to_level(exp)
  end

  # returns human-readable string
  def rank
    case level
    when 0
      RANK::Rookie
    when 1
      RANK::Squaddie
    when 2
      RANK::Corporal
    when 3
      RANK::Sergeant
    when 4
      RANK::Lieutenant
    when 5
      RANK::Captain
    when 6
      RANK::Major
    else
      RANK::Colonel
    end
  end

  # Called after XP from a mission has been applied and saved to record
  def earned_promotion?(exp_gained_on_mission)
    level != exp_to_level(exp - exp_gained_on_mission)
  end

  def promote
    # Fighter class randomnly assigned on promotion from Squaddie to Corporal
    self.update!(fighter_class: ALL_FIGHTER_CLASSES.sample) if rank == RANK::Squaddie

    # Don't select a skill if they're dead
    return unless is_alive

    new_skill = Skill.where(fighter_class: fighter_class, level: level).order('RANDOM()').take

    SkillsSoldier.create!(soldier: self, skill: new_skill)
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

  private

  def exp_to_level(xp)
    case xp
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
    when 2000..3999
      5
    when 4000..7999
      6
    else
      7
    end
  end
end
