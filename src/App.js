import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Currdata from './Components/Currdata';
import Notes from './Components/Notes';
import firebaseDB from "./firebase";

function App() {

  const [text, setText] = useState("");
  const [allData, setAllData] = useState({});
  const [dataObj, setDataObj] = useState(allData);
  const [light, setLight] = useState(true);

  const toggleDarkMode = () => {
    let element = document.body;
    element.classList.toggle("dark-theme");
    setLight(!light);
  }

  const toggleSharing = (id) => {
    firebaseDB.child(`notes/${id}`).set(
      {
        text: allData[id].text,
        date: Date.now(),
        share: !allData[id].share
      },
      err => {
        if (err) console.log(err)
      }
    )
  }

  useEffect(() => {
    firebaseDB.child('notes').on('value', snapshot => {
      if (snapshot.val()) {
        setAllData({ ...snapshot.val() })
      }
    })
  }, [])

  console.log(allData)
  return (
    <div className="App">

      <Switch>
        <Route path="/" exact>
          <button onClick={toggleDarkMode} className="toggleDarkMode">Switch to {light ? `Dark` : `Light`} Mode</button>
          <Notes {...{ allData, toggleSharing, dataObj, setDataObj, text, setText }} />
        </Route>

        <Route path="/:id">
          <Currdata {...{ allData, light, toggleDarkMode }} />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
