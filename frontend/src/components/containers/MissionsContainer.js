import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MissionForm from '../MissionForm';
import * as missionActions from '../../actions/missionActions';
import { displayName } from '../../utils/soldiers';

export class MissionsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMissionName: ''
    }

    this.submitMission = this.submitMission.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.user;
    this.props.actions.fetchMissions(token);
  }

  submitMission(mission) {
    console.log('Mission submitted: ', mission);
  }

  render() {
    return (
      <div>
        <h2>Missions</h2>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Mission</th>
              <th scope="col">Soldiers</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.missions.map((mission) => {
              const soldierNames = mission.soldiers.map(s => displayName(s));

              return (
                <tr key={mission.id}>
                  <th scope="row">{mission.name}</th>
                  <td>{soldierNames.join(', ')}</td>
                  <td>
                    <button className="btn btn-success">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <h4>Add Mission</h4>

          <MissionForm onSubmit={this.submitMission} />
        </div>
      </div>
    )
  }
}

MissionsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  missions: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    missions: state.missions,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(missionActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissionsContainer);
