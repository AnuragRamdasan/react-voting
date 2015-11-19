
import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import reducer from '../src/reducer.js';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({'entries': ['Trainspotting']}));
  });

  it('handle NEXT', () => {
    const initialState = fromJS({entries: ['Trainspotting', 'Sunshine']});
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine']
      },
      entries: []
    }));
  });

  it('handle VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', 'Sunshine'],
        tally: {
          'Trainspotting': 1
        }
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState  = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({entries: ['Trainspotting']}));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({winner: 'Trainspotting'}));
  });
});
