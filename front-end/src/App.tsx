import logo from './logo.svg';
import './App.css';
import {ConnectSearch} from "@trifenix/trifenix-connect-search";
import { TableQuery } from "@trifenix/trifenix-connect-table-container";

function App() {

  var connect = new ConnectSearch("https://search-agro.search.windows.net/",
  "entities-agro",
  "7902C1E82BEEDC85AC0E535CF45DFC77");
  
  var query = TableQuery({
    page : 1,
    elementsInPage : 10,
    pathname : "barracks",
    entity : 1,
    propIndexName : {1:6}

  });
  connect.getEntities(query).then((response) => console.log(response));;

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
