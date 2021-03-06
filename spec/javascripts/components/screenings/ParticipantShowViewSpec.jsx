import Immutable from 'immutable'
import ParticipantShowView from 'components/screenings/ParticipantShowView'
import React from 'react'
import {shallow} from 'enzyme'

describe('ParticipantShowView', () => {
  let component
  let onEdit
  beforeEach(() => {
    const participant = Immutable.fromJS({
      id: '200',
      first_name: 'Kevin',
      last_name: 'McCallister',
      gender: 'male',
      date_of_birth: '11/16/1990',
      ssn: '111223333',
    })
    onEdit = jasmine.createSpy()
    component = shallow(<ParticipantShowView participant={participant} onEdit={onEdit}/>)
  })

  it('renders a participant show view card', () => {
    expect(component.find('.card.show').length).toEqual(1)
    expect(component.find('#participants-card-200').length).toEqual(1)
  })

  it('renders the participants first and last name', () => {
    expect(component.find('.card-header').text()).toContain('Kevin McCallister')
  })

  it('renders the delete link', () => {
    expect(component.find('.fa-times').length).toEqual(1)
  })

  it('renders the edit link', () => {
    expect(component.find('EditLink').props().ariaLabel).toEqual('Edit participant')
  })

  it('renders the default avatar', () => {
    expect(component.find('img').props().src).toEqual('/assets/default-profile.svg')
  })

  it('renders the participant show fields', () => {
    expect(component.find('ShowField').length).toEqual(4)
    expect(component.find('ShowField[label="Name"]').html())
      .toContain('Kevin McCallister')
    expect(component.find('ShowField[label="Gender"]').html())
      .toContain('Male')
    expect(component.find('ShowField[label="Date of birth"]').html())
      .toContain('11/16/1990')
    expect(component.find('ShowField[label="Social security number"]').html())
      .toContain('111223333')
  })

  it('calls the onEdit function when edit link is clicked', () => {
    component.find('EditLink').simulate('click')
    expect(onEdit).toHaveBeenCalled()
  })
})

describe('ParticipantShowView with partial name', () => {
  let component
  beforeEach(() => {
    const participant = Immutable.fromJS({
      id: '200',
      first_name: 'Kevin',
      last_name: null,
      gender: 'male',
      date_of_birth: '11/16/1990',
      ssn: '111223333',
    })
    component = shallow(<ParticipantShowView participant={participant} onEdit={() => {}}/>)
  })

  it('renders the participant header corectly with null last name', () => {
    expect(component.find('.card-header').text()).not.toContain('null')
  })

  it('renders the participant name show fields', () => {
    expect(component.find('ShowField[label="Name"]').html()).not.toContain('null')
  })
})

describe('ParticipantShowView with no name', () => {
  let component
  it('does not render when not present', () => {
    const participant = Immutable.fromJS({
      id: '200',
      first_name: null,
      last_name: null,
      gender: 'male',
      date_of_birth: '11/16/1990',
      ssn: '111223333',
    })
    component = shallow(<ParticipantShowView participant={participant} onEdit={() => {}}/>)

    expect(component.find('.card-header')).not.toContain('<span></span>')
  })
})

describe('ParticipantShowView with addresses', () => {
  let component
  beforeEach(() => {
    const participant = Immutable.fromJS({
      id: '5',
      addresses: [{
        id: '1',
        street_address: '671 Lincoln Avenue',
        city: 'Winnetka',
        state: 'IL',
        zip: '60093',
        type: 'Placement',
      }],
    })
    component = shallow(<ParticipantShowView participant={participant} onEdit={() => {}}/>)
  })
  it('renders participant with address', () => {
    expect(component.find('ShowField[label="Address"]').html())
      .toContain('671 Lincoln Avenue')
    expect(component.find('ShowField[label="City"]').html())
      .toContain('Winnetka')
    expect(component.find('ShowField[label="State"]').html())
      .toContain('Illinois')
    expect(component.find('ShowField[label="Zip"]').html())
      .toContain('60093')
    expect(component.find('ShowField[label="Address Type"]').html())
      .toContain('Placement')
  })
})
