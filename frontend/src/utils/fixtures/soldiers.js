export const withoutNickname = (props={}) => {
  return {
    id: props.id || 1,
    first_name: props.first_name || 'Crash Test',
    nickname: '',
    last_name: props.last_name || 'Dummy',
    gender: props.gender || 'm',
    nationality: props.nationality || 'Testistan',
    is_alive: props.is_alive || true
  };
};

export const withNickname = (props={}) => {
  return {
    id: props.id || 1,
    first_name: props.first_name || 'Joe',
    nickname: props.nickname || 'Coastie',
    last_name: props.last_name || 'Smith',
    gender: props.gender || 'm',
    nationality: props.nationality || 'Testistan',
    is_alive: props.is_alive || true
  };
};
