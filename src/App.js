import React, { useState, useEffect } from 'react';
import List from './List';

function App() {
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setPeople] = useState([]);

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

  if (error || !Array.isArray(people)) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    let today = new Date().toJSON().slice(0, 10);
    let filterdPeople = people.filter(
      (person) => person.dob.date.slice(0, 10) == today
    );
    return (
      <main>
        <section className="container">
          <h3>birthdays today</h3>
          <List people={filterdPeople} />

          {/* <button onClick={() => setPeople([])}>Clear All</button> */}
        </section>
      </main>
      //   {/* <ul>
      //     {items.map(item => (
      //       <li key={item.id}>
      //         {item.name} {item.price}
      //       </li>
      //     ))}
      //   </ul> */}
    );
  }
}

export default App;
