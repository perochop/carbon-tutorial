// ALL DATA updates must be done here, to trigger the "state update"
import student from '../data/student';

// state is the data that's in redux store
// action is what the "action returned"
// see index.js createStore, this means that reducer.js is the "rootReducer"
// all data updates here emit data state changes, which means it will re render if needed
const studentReducer = function student(state = student, action) {
  switch (action.type) {
    case 'GET_ALL_STUDENT':
      if (action.studentArray) {
        var newArray = action.studentArray.slice(0);
        state = [...newArray];
      }
      break;
    case 'REMOVE_STUDENT':
      action.index.forEach(element => {
        state = state.filter(student => student._id !== element.id); // only "return" that'snot "selected" / "removed"
      });
      break;
    default:
      console.log('defaulted');
      break;
  }
  console.log(state);
  return state;
};

export default studentReducer;
