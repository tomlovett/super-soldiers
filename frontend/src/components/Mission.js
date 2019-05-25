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
  }

  handleClickEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  render() {
    const { onSubmit, onDelete } = this.props;
    const { mission } = this.props;
    const soldierNames = mission.soldiers.map(s => displayName(s)).join(', ');

    return this.state.isEditing ? (
        <MissionForm mission={mission} onSubmit={onSubmit} onDelete={onDelete} />
      ) : (
        <tr>
          <th scope="row">{mission.name}</th>
          <td>{soldierNames}</td>
          <td>
            <button className="btn btn-success" onClick={this.handleClickEdit}> Edit</button>
          </td>
        </tr>
      )
  }
}

Mission.propTypes = {
  mission: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Mission;
