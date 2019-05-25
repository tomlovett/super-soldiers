import React from 'react';
import PropTypes from 'prop-types';

class MissionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mission: {
        name: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.mission) {
      this.setState({mission: this.props.mission});
    }
  }

  handleChange(e) {
    this.setState({mission: { name: e.target.value }});
  }

  render() {
    const { onSubmit, onDelete } = this.props;
    const { mission } = this.state;

    return (
      <div>
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(mission);
            e.target.reset();
          }}>
          <div className="form-group">
            <input type="text" name="name"
              className="form-control"
              placeholder="Name"
              onChange={this.handleChange}
              value={mission.name}
              required />
            <input type="submit" value="Save" className="btn btn-success" />
          </div>
        </form>
        {onDelete && <div>
          <button onClick={onDelete} name="delete">Delete</button>
        </div>}
      </div>
    )
  }
}

MissionForm.propTypes = {
  mission: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func
}

export default MissionForm;
