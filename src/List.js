import React from 'react';

function List({ people }) {
  if (people.length === 0) {
    return (
      <div>
        <p>None of your friends have birthday</p>
      </div>
    );
  } else {
    return (
      <>
        {people.map((person) => {
          const { login, name, dob, picture, email, phone } = person;
          return (
            <div key={login.uuid} className="person">
              <img src={picture.large} alt={name.first} />
              <div>
                <h4>
                  {name.first} {name.last}
                </h4>
                <p>{dob.age} years old</p>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
export default List;
