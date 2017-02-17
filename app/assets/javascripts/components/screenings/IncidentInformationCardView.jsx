import IncidentInformationEditView from 'components/screenings/IncidentInformationEditView'
import IncidentInformationShowView from 'components/screenings/IncidentInformationShowView'
import React from 'react'

export default class IncidentInformationCardView extends React.component {
  constructor() {
    this.state = {
      mode: this.props.mode,
    }
  }

  onCancel() {
    this.setState()
  }

  render() {
    const {mode} = this.state
    const {screening} = this.props
    const IncidentView = (mode === 'edit') ? IncidentInformationEditView : IncidentInformationShowView
    return (
      <IncidentView screening = {screening} onCancel={this.onCancel} />
    )
  }
}
