import Immutable from 'immutable'
import React from 'react'
import {ScreeningShowPage} from 'components/screenings/ScreeningShowPage'
import {shallow, mount} from 'enzyme'

describe('ScreeningShowPage', () => {
  describe('render', () => {
    it('renders the screening reference', () => {
      const props = {
        actions: {fetchScreening: () => null},
        params: {id: '1'},
        participants: Immutable.List(),
        screening: Immutable.fromJS({reference: 'The Rocky Horror Picture Show'}),
      }
      const component = shallow(<ScreeningShowPage {...props} />)
      expect(component.find('h1').text()).toEqual('Screening #The Rocky Horror Picture Show')
    })

    it('renders the home and edit link', () => {
      const props = {
        actions: {fetchScreening: () => null},
        params: {id: '1'},
        participants: Immutable.List(),
        screening: Immutable.Map(),
      }
      const component = shallow(<ScreeningShowPage {...props} />)
      const homeLink = component.find({to: '/'})
      const editLink = component.find({to: '/screenings/1/edit'})
      expect(homeLink.html()).toContain('Home')
      expect(editLink.html()).toContain('Edit')
    })

    it('render show views', () => {
      const props = {
        actions: {fetchScreening: () => null},
        params: {id: '1'},
        participants: Immutable.List(),
        screening: Immutable.Map(),
      }
      const component = shallow(<ScreeningShowPage {...props} />)
      expect(component.find('InformationShowView').length).toEqual(1)
      expect(component.find('IncidentInformationShowView').length).toEqual(1)
      expect(component.find('HistoryCard').length).toEqual(1)
    })

    describe('participants card', () => {
      it('renders the participants card for each participant', () => {
        const participants = Immutable.fromJS([
          {id: '1', first_name: 'Melissa', last_name: 'Powers'},
          {id: '2', first_name: 'Marshall', last_name: 'Powers'},
        ])
        const props = {
          actions: {fetchScreening: () => null},
          params: {id: '1'},
          participants,
          screening: Immutable.Map(),
        }
        const component = shallow(<ScreeningShowPage {...props} />)
        expect(component.find('ParticipantCardView').length).toEqual(2)
        expect(component.find('ParticipantCardView').nodes.map((ele) => ele.props.mode)).toEqual(
          ['show', 'show']
        )
      })
    })

    describe('narrative card', () => {
      let component
      beforeEach(() => {
        const props = {
          actions: {},
          params: {id: '1'},
          participants: Immutable.List(),
          screening: Immutable.fromJS({report_narrative: 'this is a narrative report'}),
        }
        component = shallow(<ScreeningShowPage {...props} />)
      })

      describe('before the component has been loaded', () => {
        beforeEach(() => component.setState({loaded: false}))

        it('does not render the narrative card', () => {
          expect(component.find('NarrativeCardView').length).toEqual(0)
        })
      })

      describe('after the component has been loaded', () => {
        beforeEach(() => component.setState({loaded: true}))

        it('renders the narrative card', () => {
          expect(component.find('NarrativeCardView').props().narrative).toEqual(
            'this is a narrative report'
          )
          expect(component.find('NarrativeCardView').props().mode).toEqual('show')
        })
      })
    })
  })

  describe('componentDidMount', () => {
    const fetchScreening = jasmine.createSpy('fetchScreening')
    const promiseSpyObj = jasmine.createSpyObj('promiseSpyObj', ['then'])
    beforeEach(() => {
      const props = {
        actions: {fetchScreening},
        params: {id: '222'},
        participants: Immutable.List(),
        screening: Immutable.Map(),
      }
      fetchScreening.and.returnValue(promiseSpyObj)
      mount(<ScreeningShowPage {...props} />)
    })

    it('GETs the screening from the server', () => {
      expect(fetchScreening).toHaveBeenCalledWith('222')
    })
  })

  describe('componentWillReceiveProps', () => {
    it('updates the component when screening is loaded', () => {
      const props = {
        actions: {},
        params: {},
        participants: Immutable.List(),
        screening: Immutable.Map(),
      }
      const component = shallow(<ScreeningShowPage {...props}/>)
      const screening = Immutable.fromJS({id: '1', reference: 'My New Reference'})
      component.setProps({screening})
      expect(component.find('h1').text()).toContain('My New Reference')
    })
  })

  describe('cardSave', () => {
    let component
    const saveScreening = jasmine.createSpy('saveScreening')
    beforeEach(() => {
      const props = {
        actions: {saveScreening},
        params: {id: '1'},
        participants: Immutable.List(),
        screening: Immutable.Map(),
      }
      component = shallow(<ScreeningShowPage {...props} />)
    })

    it('calls screening save', () => {
      component.instance().cardSave(['report_narrative'], 'This is my new narrative')
      expect(saveScreening).toHaveBeenCalledWith({report_narrative: 'This is my new narrative'})
    })
  })
})
