import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import List from './List';

function App() {
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setPeople] = useState([]);
  const [birthdayPeople, setBirthdayPeople] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=1000&inc=name,dob,picture,login')
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setPeople(data.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  let today = new Date();
  let clickedDate;
  const handleClick = (value) => {
    clickedDate = value.toJSON().slice(5, 10);

    console.log(value, today, clickedDate);
    let filteredBirthday = people.filter(
      (person) => person.dob.date.slice(5, 10) === clickedDate
    );
    setBirthdayPeople(filteredBirthday);
    console.log(birthdayPeople);
  };

  if (error || !Array.isArray(people)) {
    return <div className="errorScreen">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loadingScreen">Loading...</div>;
  } else {
    return (
      <main>
        <section className="container">
          <h1>Birthday Reminder!</h1>
          <p>Today is</p>
          <List people={birthdayPeople} />
          <Calendar className="c1" onChange={handleClick} />
        </section>
      </main>
    );
  }
}

export default App;
