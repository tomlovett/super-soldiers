export const withoutNickname = (props={}) => {
  return {
    id: props.id || 0,
    first_name: props.first_name || 'Crash Test',
    last_name: props.last_name || 'Dummy',
    gender: props.gender || 'm',
    nationality: props.nationality || 'Testistan',
    is_alive: props.is_alive || true
  };
};

export const withNickname = (props={}) => {
  return {
    id: props.id || 0,
    first_name: props.first_name || 'Crash Test',
    last_name: props.last_name || 'Dummy',
    nickname: props.nickname || 'Oscar',
    gender: props.gender || 'm',
    nationality: props.nationality || 'Testistan',
    is_alive: props.is_alive || true
  };
};
