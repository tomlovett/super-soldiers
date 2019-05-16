import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addMission} from '../actions/missionActions';

class Missions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newMissionName: ''
    }
  }

  submitMission(missionData) {
    console.log('Mission submitted: ', missionData);
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
            {this.props.missions.map((mission, i) => {
              return (
                <div key={i}>
                  <th scope="row">{mission.name}</th>
                  <td>{mission.soldiers}</td>
                </div>
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

Missions.propTypes = {
  missions: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    missions: state.missions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMission: mission => dispatch(addMission(mission))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Missions);
