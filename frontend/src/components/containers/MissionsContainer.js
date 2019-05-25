import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as missionActions from '../../actions/missionActions';
import { displayName } from '../../utils/soldiers';

class MissionsContainer extends React.Component {
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

  submitMission() {
    alert('Mission submitted: ', this.state.newMissionName);
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
            </tr>
          </thead>
          <tbody>
            {this.props.missions.map((mission) => {
              const soldierNames = mission.soldiers.map(s => displayName(s));

              return (
                <tr key={mission.id}>
                  <th scope="row">{mission.name}</th>
                  <td>{soldierNames.join(', ')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          <h4>Add Mission</h4>

          <form onSubmit={e => {
              e.preventDefault();
              this.submitMission(e.target.value);
              e.target.reset();
            }}>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name"
                value={this.state.newMissionName}
                onChange={e => this.setState({newMissionName: e.target.value})}
                required />
              <input type="submit" value="Add" className="btn btn-success" />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

MissionsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  missions: PropTypes.array.isRequired
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
