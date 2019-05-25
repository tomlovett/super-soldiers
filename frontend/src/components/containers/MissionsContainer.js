import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Mission from '../Mission';
import MissionForm from '../MissionForm';
import * as missionActions from '../../actions/missionActions';

export class MissionsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMissionName: ''
    }

    this.editMission = this.editMission.bind(this);
    this.deleteMission = this.deleteMission.bind(this);
    this.submitMission = this.submitMission.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.user;
    this.props.actions.fetchMissions(token);
  }

  editMission(mission) { return mission }

  deleteMission(mission) { return mission }

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
              return <Mission key={mission.id}
                mission={mission}
                onSubmit={this.submitMission}
                onDelete={this.deleteMission}
              />
            })}
            <tr><td>Add Mission</td></tr>
            {/* <MissionForm onSubmit={this.submitMission} /> */}
          </tbody>
        </table>
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
