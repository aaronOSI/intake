import React from 'react'
import ParticipantShowView from 'components/screenings/ParticipantShowView'
import ParticipantEditView from 'components/screenings/ParticipantEditView'

export default class ParticipantCardView extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      mode: this.props.mode,
    }
    this.onEdit = this.onEdit.bind(this)
  }

  onEdit() {
    this.setState({mode: 'edit'})
  }

  render() {
    const {mode} = this.state
    const {participant} = this.props
    let View
    if (mode === 'edit') {
      View = ParticipantEditView
    } else {
      View = ParticipantShowView
    }
    return (
      <View participant={participant} onEdit={this.onEdit} onDelete={this.props.onDelete} />
    )
  }
}

ParticipantCardView.propTypes = {
  mode: React.PropTypes.oneOf(['edit', 'show']),
  onDelete: React.PropTypes.func,
  participant: React.PropTypes.object.isRequired,
}
