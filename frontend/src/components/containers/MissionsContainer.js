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

    this.deleteMission = this.deleteMission.bind(this);
    this.submitMission = this.submitMission.bind(this);
  }

  componentDidMount() {
    const { token } = this.props.user;

    if (!token) {
      this.props.history.push('/');
    }

    this.props.actions.fetchMissions(token);
  }

  deleteMission(mission) {
    const { token } = this.props.user;

    this.props.actions.deleteMission(mission, token);
  }

  submitMission(mission) {
    const { token } = this.props.user;
    const { addMission, updateMission } = this.props.actions;

    mission.id ? updateMission(mission, token) : addMission(mission, token);
  }

  render() {
    return (
      <div>
        <h2>Missions</h2>

        <div className="container">
          <div className="row">
            <div className="col-4"><h4>Name</h4></div>
            <div className="col-8"><h4>Soldiers</h4></div>
          </div>

          {this.props.missions.map((mission) => {
            return <Mission key={mission.id}
              mission={mission}
              onSubmit={this.submitMission}
              onDelete={this.deleteMission}
            />
          })}

          <div>
            <h4>New Mission</h4>
            <MissionForm onSubmit={this.submitMission} />
          </div>
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
