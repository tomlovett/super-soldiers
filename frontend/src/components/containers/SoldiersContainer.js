import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as soldierActions from '../../actions/soldierActions';
import { fullName } from '../../utils/soldiers';

export class SoldiersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      soldiersQueried: false,
    };
  }

  componentDidMount() {
    const { actions, soldiers, user } = this.props;
    if (!user.token) {
      this.props.history.push('/');
    }

    if (!soldiers.length && !this.state.soldiersQueried) {
      this.setState({ soldiersQueried: true });

      actions.fetchSoldiers(user.token);
    }
  }


  render() {
    return (
      <div>
        <h2>Soldiers</h2>

        <div className="container">
            <div className="row">
              <h4 className="col-6">Name</h4>
              <h4 className="col-2">Gender</h4>
              <h4 className="col-4">Nationality</h4>
            </div>
            <div name="soldiers">
              {this.props.soldiers.map(soldier => {
                return (
                  <div className="row" key={soldier.id}>
                    <p className="col-6">{fullName(soldier)}</p>
                    <p className="col-2">{soldier.gender}</p>
                    <p className="col-4">{soldier.nationality}</p>
                  </div>
                );
              })}
            </div>
        </div>
      </div>
    )
  }
}

SoldiersContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
