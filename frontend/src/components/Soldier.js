import React from 'react';
import { fullName } from '../utils/soldiers';
import PropTypes from 'prop-types';

const Soldier = ({ soldier }) => {
  return (
    <div className="row">
      <p className="col-6">{fullName(soldier)}</p>
      <p className="col-2">{soldier.gender.toUpperCase()}</p>
      <p className="col-4">{soldier.nationality}</p>
    </div>
  );
}

Soldier.propTypes = {
  soldier: PropTypes.object.isRequired
};

export default Soldier;
