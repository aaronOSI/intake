import Immutable from 'immutable'
import React from 'react'
import IncidentInformationEditView from 'components/screenings/IncidentInformationEditView'
import {shallow} from 'enzyme'

fdescribe('IncidentInformationEditView', () => {
  let component
  let onChange
  beforeEach(() => {
    onChange = jasmine.createSpy()
    const screening = Immutable.fromJS({
      incident_date: '2006-01-21',
      incident_county: 'alpine',
      address: Immutable.fromJS({
        id: '2',
        street_address: '1500 7th St',
        city: 'Sacramento',
        state: 'CA',
        zip: '95814',
      }),
      location_type: 'Juvenile Detention',
      response_time: 'within_twenty_four_hours',
      screening_decision: 'accept_for_investigation',
    })
    component = shallow(<IncidentInformationEditView screening={screening} onChange={onChange} />)
  })

  it('renders the card header', () => {
    expect(component.find('.card-header').text()).toEqual('Incident Information')
  })

  it('renders the input fields', () => {
    expect(component.find('DateField[label="Incident Date"]').props().value)
      .toEqual('2006-01-21')
    expect(component.find('SelectField[label="Incident County"]').props().value)
      .toEqual('alpine')
    expect(component.find('InputField[label="Address"]').props().value)
      .toEqual('1500 7th St')
    expect(component.find('InputField[label="City"]').props().value)
      .toEqual('Sacramento')
    expect(component.find('InputField[label="Zip"]').props().value)
      .toEqual('95814')
    expect(component.find('SelectField[label="State"]').props().value)
      .toEqual('CA')
    expect(component.find('SelectField[label="Location Type"]').props().value)
      .toEqual('Juvenile Detention')
    expect(component.find('SelectField[label="Response Time"]').props().value)
      .toEqual('within_twenty_four_hours')
    expect(component.find('SelectField[label="Screening Decision"]').props().value)
      .toEqual('accept_for_investigation')
  })

   it('renders the save button', () => {
    expect(component.find('.btn.btn-primary').text()).toEqual('Save')
  })

  it('renders the cancel link', () => {
    expect(component.find('.btn.btn-default').text()).toEqual('Cancel')
  })

  it('fires the onChange call when a field changes', () => {
    component.find('#incident_date').simulate('change', {target: {value: '01/21/2006'}})
    expect(onChange).toHaveBeenCalledWith(['incident_date'], '01/21/2006')
  })
})
