import * as Utils from 'utils/http'
import CommunicationMethod from 'CommunicationMethod'
import Immutable from 'immutable'
import React from 'react'
import Autocompleter from 'Autocompleter'
import ParticipantEditView from 'ParticipantEditView'

export default class ScreeningEditPage extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      screening: Immutable.fromJS({
        name: '',
        started_at: '',
        ended_at: '',
        communication_method: '',
        participants: [],
        report_narrative: '',
      }),
    }

    this.fetch = this.fetch.bind(this)
    this.setField = this.setField.bind(this)
    this.addParticipant = this.addParticipant.bind(this)
  }

  componentDidMount() {
    this.fetch()
  }

  fetch() {
    const {params} = this.props
    const xhr = Utils.request('GET', `/screenings/${params.id}.json`)
    xhr.done((xhrResp) => {
      this.setState({screening: Immutable.fromJS(xhrResp.responseJSON)})
    })
  }

  setField(fieldSeq, value) {
    const screening = this.state.screening.setIn(fieldSeq, value)
    this.setState({screening: screening})
  }

  addParticipant(participant) {
    const {screening} = this.state
    const participants = screening.get('participants').push(Immutable.Map(participant))
    this.setState({
      screening: screening.set('participants', participants),
    })
  }

  renderParticipantsCard() {
    const {screening} = this.state
    return (
      <div>
        <div className='card edit double-gap-top' id='participants-card'>
          <div className='card-header'>
            <span>Participants</span>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-md-6'>
                <label className='no-gap' htmlFor='screening_participants'>Participants</label>
                <Autocompleter id='screening_participants' onSelect={this.addParticipant}/>
              </div>
            </div>
          </div>
        </div>
        {
          screening.get('participants').map((participant) =>
            <ParticipantEditView key={participant.get('id')} participant={participant} />
            )
        }
      </div>
    )
  }

  renderScreeningInformationCard() {
    const {screening} = this.state
    return (
      <div className='card edit double-gap-top' id='screening-information-card'>
        <div className='card-header'>
          <span>Screening Information</span>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-6'>
              <label className='no-gap' htmlFor='screening_name'>Title/Name of Screening</label>
              <input
                name='screening[name]'
                id='screening_name'
                placeholder='Enter name of the screening'
                value={screening.get('name') || ''}
                onChange={(event) => this.setField(['name'], event.target.value)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor='screening_started_at'>Screening Start Date/Time</label>
              <input
                type='datetime'
                name='screening[started_at]'
                id='screening_started_at'
                value={screening.get('started_at') || ''}
                onChange={(event) => this.setField(['started_at'], event.target.value)}
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='screening_ended_at'>Screening End Date/Time</label>
              <input
                type='datetime'
                name='screening[ended_at]'
                id='screening_ended_at'
                value={screening.get('ended_at') || ''}
                onChange={(event) => this.setField(['ended_at'], event.target.value)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor='screening_communication_method'>Communication Method</label>
              <select
                name='screening[communication_method]'
                id='screening_communication_method'
                value={screening.get('communication_method') || ''}
                onChange={(event) => this.setField(['communication_method'], event.target.value)}
              >
                <option key='' value=''></option>
                {Object.keys(CommunicationMethod).map((item) => <option key={item} value={item}>{CommunicationMethod[item]}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderNarrativeCard() {
    const {screening} = this.state
    return (
      <div className='card edit double-gap-top' id='narrative-card'>
        <div className='card-header'>
          <span>Narrative</span>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-md-12'>
              <label className='no-gap' htmlFor='screening[report_narrative]'>Report Narrative</label>
              <textarea
                name='screening[report_narrative]'
                id='screening[report_narrative]'
                value={screening.get('report_narrative') || ''}
                onChange={(event) => this.setField(['report_narrative'], event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderScreeningInformationCard()}
        {this.renderParticipantsCard()}
        {this.renderNarrativeCard()}
      </div>
    )
  }
}

ScreeningEditPage.propTypes = {
  params: React.PropTypes.object.isRequired,
}
