import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import List from './List';
function App() {
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setPeople] = useState([]);
  const [birthdayToday, setBirthdayToday] = useState();
  const [clickedBirthday, setClickedBirthday] = useState([]);
  const [date, setDate] = useState({
    today: '',
    clickedDate: '',
  });

  // const today = new Date().toString().slice(4, 10);
  // let clickedDate;

  useEffect(() => {
    fetch(
      'https://randomuser.me/api/?results=1000&inc=name,dob,picture,login,email,phone'
    )
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

  useEffect(() => {
    setDate((prevState) => ({
      ...prevState,
      today: new Date().toString().slice(4, 10),
    }));
    setBirthdayToday(
      people.filter(
        (person) =>
          new Date(
            new Date(person.dob.date).getTime() +
              new Date(person.dob.date).getTimezoneOffset() * 60000
          )
            .toString()
            .slice(4, 10) === date.today
      )
    );
  }, [people, date.today]);

  const handleClick = (value) => {
    setDate((prevState) => ({
      ...prevState,
      clickedDate: value.toString().slice(4, 10),
    }));
    let filteredBirthday = people.filter(
      (person) =>
        new Date(
          new Date(person.dob.date).getTime() +
            new Date(person.dob.date).getTimezoneOffset() * 60000
        )
          .toString()
          .slice(4, 10) === date.clickedDate
    );
    setClickedBirthday(filteredBirthday);
  };

  if (error || !Array.isArray(people)) {
    return <div className="errorScreen">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="loadingScreen">Loading...</div>;
  } else {
    return (
      <>
        <main>
          <div>
            <section className="container today">
              <h1>Birthday Reminder!</h1>
              <h4>It's {date.today} today</h4>
              <List people={birthdayToday} />
            </section>
          </div>
          <div>
            <section className="container calendar">
              <h4>Use calendar to check your friends' birthdays!</h4>
              <Calendar className="c1" onChange={handleClick} />
            </section>
            <section className="container upcoming">
              {date.clickedDate === '' ? null : (
                <h2>Birthday on {date.clickedDate}</h2>
              )}
              <List people={clickedBirthday} />
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default App;
