import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

function PlayerInput({ onSubmit, label = 'username' }) {
  const [username, setUsername] = useState('');

  const handleChange = (e) => setUsername(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(username);
  }

  return (
    <form className='column' onSubmit={handleSubmit}>
      <label className='header' htmlFor='username'>{label}</label>
      <input
        type="text"
        id='username'
        placeholder='github username'
        autoComplete='off'
        value={username}
        onChange={handleChange}
      />
      <button
        className='button'
        type='submit'
        disabled={!username}>
          Submit
      </button>

    </form>
  );
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

function Battle ({ match }) {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);

  const submitPlayer = (id, player) => {
    id === 'playerOne'
      ? setPlayerOne(player)
      : setPlayerTwo(player)
  }

  const resetPlayer = (id) => {
    id === 'playerOne'
      ? setPlayerOne(null)
      : setPlayerTwo(null)
  }

  return (
    <div>
      <div className="row">
        {!playerOne
          ? <PlayerInput id='playerOne' label='Player One' onSubmit={(player) => submitPlayer('playerOne', player)} />
          : <PlayerPreview
              username={playerOne} >
                <button
                  className='reset'
                  onClick={() => resetPlayer('playerOne')}>
                    Reset
                </button>
            </PlayerPreview>}

        {!playerTwo
          ? <PlayerInput id='playerTwo' label='Player Two' onSubmit={(player) => submitPlayer('playerTwo', player)}/>
          : <PlayerPreview
              username={playerTwo}>
              <button
                className='reset'
                onClick={() => resetPlayer('playerTwo')}>
                  Reset
              </button>
            </PlayerPreview>}
      </div>

      {playerOne && playerTwo &&
        <Link
          className='button'
          to={{
            pathname: match.url + '/results',
            search: `?playerOneName=${playerOne}&playerTwoName=${playerTwo}`
          }}>
            Battle
        </Link>}
    </div>
  )
}

export default Battle;
