import { ADD_STRESSOR, DELETE_STRESSOR, CLEAR_STRESSORS } from './../constants';

export const addStressor = (text, dateDue) => {
  const action = { type: ADD_STRESSOR, text, dateDue };
  return action;
};

export const deleteStressor = id => {
  const action = {
    type: DELETE_STRESSOR,
    id
  };
  return action;
};

export const clearStressors = () => {
  const action = {
    type: CLEAR_STRESSORS
  };
  console.log('clear all');
  return action;
};
