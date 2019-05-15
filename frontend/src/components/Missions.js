import React from 'react';

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

        <ul className="list-group">
          {this.props.missions.map((mission, i) => <li key={i} className="list-group-item">{mission.name}</li>)}
        </ul>

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

export default Missions;
