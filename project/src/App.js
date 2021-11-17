import logo from './logo.svg';
import './App.css';
import StartPage from './components/StartPage';
import CmpltPage from './components/CmpltPage';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import ExamplePage from './components/ExamplePage';
import QuestionPage from './components/QuestionPage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>       
        <Route exact path = "/">
          <StartPage />
        </Route>

        <Route path = "/example">
          <ExamplePage />
        </Route>

        <Route path = "/question">
          <QuestionPage />
        </Route>
        
        <Route path = "/completion">
          <CmpltPage /> 
        </Route>

        <Route path ="/result">
          <ResultPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
