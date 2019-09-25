// ALL DATA updates must be done here, to trigger the "state update"

import student from '../data/student';

// state is the data that's in redux store
// action is what the "action returned"
// see index.js createStore, this means that reducer.js is the "rootReducer"
// all data updates here emit data state changes, which means it will re render if needed
const studentReducer = function student(state = student, action) {
  switch (action.type) {
    case 'GET_ALL_STUDENT':
      if (action.post) state = action.post;
      break;
    default:
      console.log('defaulted');
      break;
  }
  return state;
};

export default studentReducer;
