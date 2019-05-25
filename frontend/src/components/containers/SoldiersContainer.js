import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as soldierActions from '../../actions/soldierActions';

class SoldiersContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { token } = this.props.user;
    this.props.actions.fetchSoldiers(token);
  }


  render() {
    return (
      <div>
        <h2>Soldiers</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Nationality</th>
          </tr>
        </thead>
        <tbody>
          {this.props.soldiers.map(soldier => {
            return (
              <tr key={soldier.id}>
                <td>{soldier.first_name + ' ' + soldier.last_name}</td>
                <td>{soldier.gender}</td>
                <td>{soldier.nationality}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    )
  }
}

SoldiersContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  soldiers: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    soldiers: state.soldiers,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(soldierActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SoldiersContainer);
