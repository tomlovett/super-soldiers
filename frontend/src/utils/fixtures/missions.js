import * as soldierFixtures from './soldiers';

export const mission = (props={}) => {
  return {
    id: props.id || 1,
    name: props.name || 'Test Mission',
    soldiers: props.soldiers || []
  };
};

export const missionWithSoldiers = (props={}) => {
  const soldiers = [
    soldierFixtures.withoutNickname(),
    soldierFixtures.withNickname()
  ];

  return {
    id: props.id || 1,
    name: props.name || 'Test Mission',
    soldiers: props.soldiers || soldiers
  };
};
