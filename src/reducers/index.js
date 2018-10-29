import { ADD_STRESSOR, DELETE_STRESSOR, CLEAR_STRESSORS } from './../constants';
//deal with cookies
import { bake_cookie, read_cookie } from 'sfcookies';

const stressor = action => {
  const { text, dateDue } = action;
  return {
    id: Math.trunc(Math.random() * Math.pow(10, 8)),
    text,
    dateDue
  };
};
const deleteStressorById = (state = [], id) => {
  const stressors = state.filter(stressor => stressor.id !== id);
  return stressors;
};

const stressors = (state = [], action) => {
  let stressors = null;
  //let state be read as cookies of reminders
  state = read_cookie('stressors');
  //switch statement will look at the type of action ...
  switch (action.type) {
    case ADD_STRESSOR:
      stressors = [...state, stressor(action)];
      //store cookies
      bake_cookie('stressors', stressors);
      return stressors;
    case DELETE_STRESSOR:
      stressors = deleteStressorById(state, action.id);
      //note deleted cookie
      bake_cookie('stressors', stressors);
      return stressors;
    case CLEAR_STRESSORS:
      stressors = [];
      bake_cookie('stressors', stressors);
      return stressors;
    default:
      return state;
  }
};

export default stressors;
