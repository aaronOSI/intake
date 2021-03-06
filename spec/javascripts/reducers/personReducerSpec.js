import * as personActions from 'actions/personActions'
import Immutable from 'immutable'
import personReducer from 'reducers/personReducer'

describe('personReducer', () => {
  describe('on FETCH_PERSON_SUCCESS', () => {
    it('returns the person from the action', () => {
      const person = Immutable.Map({id: '1', first_name: 'Bart'})
      const action = personActions.fetchPersonSuccess(person)

      expect(personReducer(Immutable.Map(), action)).toEqual(person)
    })
  })

  describe('on CREATE_PERSON_SUCCESS', () => {
    it('returns the person from the action', () => {
      const person = Immutable.Map({id: '1', first_name: 'Bart'})
      const action = personActions.createPersonSuccess(person)

      expect(personReducer(Immutable.Map(), action)).toEqual(person)
    })
  })

  describe('on UPDATE_PERSON_SUCCESS', () => {
    it('returns the person from the action', () => {
      const initialPerson = Immutable.Map({id: '1', first_name: 'Bart'})
      const updatedPerson = Immutable.Map({id: '1', first_name: 'Lisa'})
      const action = personActions.updatePersonSuccess(updatedPerson)

      expect(personReducer(initialPerson, action)).toEqual(updatedPerson)
    })
  })
})
