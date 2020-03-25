import { expect } from 'chai';
import sinon from 'sinon';
import { actions } from '../../src/store';

describe('actions', () => {
  it('incrementAsync', () => {
    const commit = sinon.spy(); // 构造一个commit,主要用于接收参数
    const state = {};

    actions.incrementAsync({ commit, state });
    // 这里判断commit的参数
    expect(commit.args).to.deep.equal([['addProps']]);
  });
});
