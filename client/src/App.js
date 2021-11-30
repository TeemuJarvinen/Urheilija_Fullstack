import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [callingName, setCallingName] = useState("");
  const [birthyear, setBirthYear] = useState(0);
  const [weight, setWeight] = useState(0);
  const [pictureAddress, setPictureAddress] = useState("");
  const [sport, setSport] = useState("");
  const [achievements, setAchievements] = useState("");

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newCallingName, setNewCallingName] = useState("");
  const [newBirthyear, setNewBirthYear] = useState(0);
  const [newWeight, setNewWeight] = useState(0);
  const [newPictureAddress, setNewPictureAddress] = useState("");
  const [newSport, setNewSport] = useState("");
  const [newAchievements, setNewAchievements] = useState("");

  const [athleteList, setAthleteList] = useState([]);

  const getAthletes = () => {
    Axios.get("http://localhost:3001/urheilijat").then((res) => {
      setAthleteList(res.data);
    });
  };
  const addAthlete = () => {
    if (firstName == "" || lastName == "" || birthyear == "" || sport == "") {
      alert(
        "Etunimi sukunimi, syntymäaika ja laji -kentät eivät voi olla tyhjiä"
      );
    } else {
      Axios.post("http://localhost:3001/urheilijat", {
        Etunimi: firstName,
        Sukunimi: lastName,
        Kutsumanimi: callingName,
        Syntymavuosi: birthyear,
        Paino: weight,
        Kuva: pictureAddress,
        Laji: sport,
        Saavutukset: achievements,
      }).then(() => {
        setAthleteList([
          ...athleteList,
          {
            Etunimi: firstName,
            Sukunimi: lastName,
            Kutsumanimi: callingName,
            Syntymavuosi: birthyear,
            Paino: weight,
            Kuva: pictureAddress,
            Laji: sport,
            Saavutukset: achievements,
          },
        ]);
      });
    }
  };

  const modifyAthlete = (Id) => {
    if (
      newFirstName == "" ||
      newLastName == "" ||
      newBirthyear == "" ||
      newSport == ""
    ) {
      alert(
        "Etunimi sukunimi, syntymäaika ja laji -kentät eivät voi olla tyhjiä"
      );
    } else {
      Axios.put("http://localhost:3001/urheilijat/", {
        Etunimi: newFirstName,
        Sukunimi: newLastName,
        Kutsumanimi: newCallingName,
        Syntymavuosi: newBirthyear,
        Paino: newWeight,
        Kuva: newPictureAddress,
        Laji: newSport,
        Saavutukset: newAchievements,
        id: Id,
      }).then((res) => {
        getAthletes();
      });
    }
  };
  const deleteAthlete = (Id) => {
    Axios.delete(`http://localhost:3001/urheilijat/${Id}`).then((res) => {
      getAthletes();
    });
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Urheilijalista - Fullstack app</h1>
        <label>Etunimi:</label>
        <input
          placeholder="Etunimi"
          type="text"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <label>Sukunimi:</label>
        <input
          placeholder="Sukunimi"
          type="text"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <label>Kutsumanimi:</label>
        <input
          placeholder="Kutsumanimi"
          type="text"
          onChange={(e) => {
            setCallingName(e.target.value);
          }}
        />
        <label>Syntymäaika (vuosi-kuukausi-päivä):</label>
        <input
          placeholder="Syntymäaika (vvvv-kk-pp)"
          type="text"
          onChange={(e) => {
            setBirthYear(e.target.value);
          }}
        />
        <label>Paino:</label>
        <input
          placeholder="Paino"
          type="number"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
        <label>Kuvan osoite:</label>
        <input
          placeholder="Kuvan osoite (url)"
          type="text"
          onChange={(e) => {
            setPictureAddress(e.target.value);
          }}
        />
        <label>Laji:</label>
        <input
          placeholder="Laji"
          type="text"
          onChange={(e) => {
            setSport(e.target.value);
          }}
        />
        <label>Saavutukset:</label>
        <input
          placeholder="Saavutukset"
          type="text"
          onChange={(e) => {
            setAchievements(e.target.value);
          }}
        />
        <div className="button-container">
          <button className="btn" onClick={getAthletes}>
            Näytä Urheilijat
          </button>
          <button className="btn" onClick={addAthlete}>
            Lisää Urheilija
          </button>
        </div>
      </div>
      <div className="athlete-container">
        {athleteList.map((obj) => {
          return (
            <div className="athlete">
              <h3>Urheilija : {obj.Etunimi + " " + obj.Sukunimi}</h3>
              <div className="picture">
                <h3>
                  Kuva: <img src={obj.Kuva} alt="picture missing" />
                </h3>
              </div>
              <h3>Kutsumanimi: {obj.Kutsumanimi}</h3>
              <h3>Syntymäaika: {obj.Syntymavuosi}</h3>
              <h3>Paino: {obj.Paino}</h3>
              <h3>Laji: {obj.Laji}</h3>
              <h3>Saavutukset: {obj.Saavutukset}</h3>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Etunimi"
                  onChange={(e) => {
                    setNewFirstName(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Sukunimi"
                  onChange={(e) => {
                    setNewLastName(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Kuvan osoite"
                  onChange={(e) => {
                    setNewPictureAddress(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Kutsumanimi"
                  onChange={(e) => {
                    setNewCallingName(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Syntymäaika (yyyy-mm-dd)"
                  onChange={(e) => {
                    setNewBirthYear(e.target.value);
                  }}
                />

                <input
                  type="number"
                  placeholder="Paino"
                  onChange={(e) => {
                    setNewWeight(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Laji"
                  onChange={(e) => {
                    setNewSport(e.target.value);
                  }}
                />

                <input
                  type="text"
                  placeholder="Saavutukset"
                  onChange={(e) => {
                    setNewAchievements(e.target.value);
                  }}
                />
              </div>
              <div className="button-container-athlete">
                <span>
                  (Mikäli kenttä on tyhjä, se poistaa aikaisemman tiedon)
                </span>
                <button
                  className="btn-athlete"
                  onClick={() => {
                    modifyAthlete(obj.Id);
                  }}
                >
                  Muokkaa
                </button>

                <button
                  className="btn-athlete"
                  onClick={() => {
                    deleteAthlete(obj.Id);
                  }}
                >
                  Poista
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
