import App from './App';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    student: state,
  };
}

// AppStore connects App and Redux data "student" or you can copy all of this to App -- LOL
const AppStore = connect(mapStateToProps)(App);

export default AppStore;
