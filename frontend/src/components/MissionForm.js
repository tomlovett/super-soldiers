import React from 'react'
import PropTypes from 'prop-types'

class MissionForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
		}

		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		if (this.props.mission) {
			this.setState(this.props.mission)
		}
	}

	handleChange(e) {
		this.setState({ name: e.target.value })
	}

	render() {
		const { onSubmit, onDelete, onCancel } = this.props
		const mission = this.state

		return (
			<div>
				<form onSubmit={e => {
					e.preventDefault()
					onSubmit(mission)
					e.target.reset()
				}}>
					<div className="form-group row">
						<input type="text" name="name"
							className="form-control col-4"
							placeholder="Name"
							onChange={this.handleChange}
							value={mission.name}
							required />

						{/* List each soldiers; edit/ delete */}

						<div className="col d-flex align-items-end justify-content-end">
							{onCancel && <div>
								<button onClick={onCancel} name="cancel" className="btn btn-warning">Cancel</button>
								<pre>&nbsp;</pre>
							</div>}
							{onDelete && <div>
								<button onClick={() => onDelete(mission)} name="delete" className="btn btn-danger">Delete</button>
								<pre>&nbsp;</pre>
							</div>}
							<input type="submit" value="Save" className="btn btn-success" />
						</div>
					</div>
				</form>
			</div>
		)
	}
}

MissionForm.propTypes = {
	mission: PropTypes.object,
	onSubmit: PropTypes.func.isRequired,
	onDelete: PropTypes.func,
	onCancel: PropTypes.func
}

export default MissionForm
