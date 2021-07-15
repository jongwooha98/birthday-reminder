import React from 'react';

function List({ people }) {
  return (
    <>
      {people.map((person) => {
        const { login, name, dob, picture } = person;
        return (
          <article key={login.uuid} className="person">
            <img src={picture.medium} alt={name.first} />
            <div>
              <h4>
                {name.first} {name.last}
              </h4>
              <p>{dob.age} years old</p>
              <p>{dob.date}</p>
            </div>
          </article>
        );
      })}
    </>
  );
}
export default List;
