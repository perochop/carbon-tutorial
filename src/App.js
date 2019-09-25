import React, { Component } from 'react';
import './app.scss';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import TutorialHeader from './components/TutorialHeader';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './content/LandingPage';
import RepoPage from './content/RepoPage';
import StudentForm from './content/LandingPage/StudentForm';

class App extends Component {
  render() {
    //console.log(this.props.student);   // this was passed via AppStore
    return (
      <>
        <TutorialHeader />
        <Content>
          <Switch>
            {/* if the url is the same as below, display component being mapped  */}
            <Route exact path="/" component={LandingPage} />
            <Route path="/repos" component={RepoPage} />
            {/* adding :id means that this "value" can be retrieved via params inside Form class  */}
            <Route path="/form/:id" component={StudentForm} />
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
