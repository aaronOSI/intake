import County from 'County'
import moment from 'moment'
import React from 'react'
import ResponseTime from 'ResponseTime'
import ScreeningDecision from 'ScreeningDecision'
import USState from 'USState'

const ReferralInformationShowView = ({screening}) => (
  <div className='card double-gap-top' id='referral-information-card'>
    <div className='card-header'>
      <span>Referral Information</span>
    </div>
    <div className='card-body'>
      <div className='row'>
        <div className='col-md-6'>
          <label>Incident Date</label>
          <div className='c-gray'>{screening.get('incident_date') === null ?
            '' : moment(screening.get('incident_date')).format('MM/DD/YYYY')}</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <label>Incident County</label>
          <div className='c-gray'>{County[screening.get('incident_county')]}</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <label>Address</label>
          <div className='c-gray'>{screening.getIn(['address', 'street_address'])}</div>
        </div>
        <div className='col-md-6'>
          <label>City</label>
          <div className='c-gray'>{screening.getIn(['address', 'city'])}</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <label>State</label>
          <div className='c-gray'>{USState[screening.getIn(['address', 'state'])]}</div>
        </div>
        <div className='col-md-6'>
          <label>Zip</label>
          <div className='c-gray'>{screening.getIn(['address', 'zip'])}</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <label>Location Type</label>
          <div className='c-gray'>{screening.get('location_type')}</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <label>Response Time</label>
          <div className='c-gray'>{ResponseTime[screening.get('response_time')]}</div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <label>Screening Decision</label>
          <div className='c-gray'>{ScreeningDecision[screening.get('screening_decision')]}</div>
        </div>
      </div>
    </div>
  </div>
)

ReferralInformationShowView.propTypes = {
  screening: React.PropTypes.object.isRequired,
}
export default ReferralInformationShowView
