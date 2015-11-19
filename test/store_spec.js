
import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import makeStore from '../src/store';

describe('store', () => {

  it('is a Redux store configured with correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', 'Sunshine']
    });
    expect(store.getState()).to.equal(fromJS({ entries: ['Trainspotting', 'Sunshine']}));
  });
});
