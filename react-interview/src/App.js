import './App.css';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import Movies from './components/movies';
import Header from './components/layout/header';

function App() {

  return (
    <Provider store={store}>
      <Header />
      <Movies />
    </Provider>

  );
}

export default App;
