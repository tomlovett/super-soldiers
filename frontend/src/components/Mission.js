import React from 'react';
import PropTypes from 'prop-types';
import { displayName } from '../utils/soldiers';
import MissionForm from './MissionForm';

class Mission extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleClickEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleOnSubmit(missionData) {
    this.setState({ isEditing: false });
    this.props.onSubmit(missionData);
  }

  render() {
    const { mission, onDelete } = this.props;
    const soldierNames = mission.soldiers.map(s => displayName(s)).join(', ');

    return this.state.isEditing ? (
        <MissionForm
          mission={mission}
          onSubmit={this.handleOnSubmit}
          onCancel={this.handleClickEdit}
          onDelete={onDelete}
        />
      ) : (
        <div className="row">
          <h6 className="col-4">
            <b>{mission.name}</b>
          </h6>
          <p className="col-6">{soldierNames}</p>
          <div className="col-2">
            <button name="Edit" className="btn btn-primary" onClick={this.handleClickEdit}>Edit</button>
          </div>
        </div>
      )
  }
}

Mission.propTypes = {
  mission: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Mission;
