import React from 'react';
import PropTypes from 'prop-types';

class SoldierForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      first_name: '',
      nickname: '',
      last_name: '',
      gender: '',
      nationality: '',
      is_alive: true
    };
  }

  componentDidMount() {
    const { soldier } = this.props;

    if (soldier) {
      this.setState(soldier);
    }
  }

  updateField = (e, attr) => {
    const {value} = e.target;
    const pojo = {};
    pojo[attr] = value;
    this.setState(pojo);
  }

  updateIsAlive = e => this.setState({ 'is_alive': e.target.checked });

  render() {
    const soldier = this.state;
    const { onSubmit, onCancel, onDelete } = this.props;

    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          onSubmit(soldier);
          e.target.reset();
        }}>
          <div className="row form-group">
            <input type="text" name="first_name"
              className="form-control col-4"
              placeholder="First name"
              onChange={e => this.updateField(e, 'first_name')}
              value={soldier.first_name}
              required />

            <input type="text" name="nickname"
              className="form-control col-4"
              placeholder="Nickname"
              onChange={e => this.updateField(e, 'nickname')}
              value={soldier.nickname}
            />

            <input type="text" name="last_name"
              className="form-control col-4"
              placeholder="Last name"
              onChange={e => this.updateField(e, 'last_name')}
              value={soldier.last_name}
              required />
          </div>
          <div className="row form-group">
            <input type="text" name="nationality"
              className="form-control col-6"
              placeholder="Nationality"
              onChange={e => this.updateField(e, 'nationality')}
              value={soldier.nationality}
              required />

            <div className="form-check">
              <label className="form-check-label">
                Gender
              </label>
              <input type="radio" name="gender" value="m" checked={soldier.gender === 'm'} onChange={e => this.updateField(e, 'gender')} /> {'M  '}
              <input type="radio" name="gender" value="f" checked={soldier.gender === 'f'} onChange={e => this.updateField(e, 'gender')} /> {'F  '}
            </div>

            <div className="form-check">
              <input type="checkbox" name="is_alive"
                className="form-check-input"
                checked={soldier.is_alive === true}
                onChange={this.updateIsAlive}
                />
              <label className="form-check-label">Alive?</label>
            </div>
          </div>

          <div>
            {onCancel && <div>
              <button onClick={onCancel} name="cancel" className="btn btn-warning">Cancel</button>
              <pre>&nbsp;</pre>
            </div>}

            {onDelete && <div>
              <button onClick={() => onDelete(soldier)} name="delete" className="btn btn-danger">Delete</button>
              <pre>&nbsp;</pre>
            </div>}

            <input type="submit" value="Save" className="btn btn-success" />
          </div>
        </form>
      </div>
    )
  }
}

SoldierForm.propTypes = {
  soldier: PropTypes.object,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func.isRequired
};

export default SoldierForm;
