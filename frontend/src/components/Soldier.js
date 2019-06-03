import React from 'react';
import { fullName } from '../utils/soldiers';
import PropTypes from 'prop-types';
import SoldierForm from './SoldierForm';

class Soldier extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isEditing: false };

    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleClickEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleOnSubmit(soldierData) {
    this.handleClickEdit();
    this.props.onSubmit(soldierData);
  }

  render() {
    const { soldier } = this.props;

    return this.state.isEditing ? (
      <SoldierForm
        soldier={this.props.soldier}
        onCancel={this.handleClickEdit}
        onSubmit={this.handleOnSubmit}
        onDelete={this.props.onDelete}
      />
    ) : (
      <div className="row">
        <p className="col-6">{fullName(soldier)}</p>
        <p className="col-2">{soldier.gender.toUpperCase()}</p>
        <p className="col-4">{soldier.nationality}</p>
        <button className="btn btn-primary" name="edit" onClick={this.handleClickEdit}>
          Edit
        </button>
      </div>
    );
  }
}

Soldier.propTypes = {
  soldier: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func
};

export default Soldier;
