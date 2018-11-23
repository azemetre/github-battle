const React = require('react');
const PropTypes = require('prop-types');

function PlayerPreview ({ avatar, username, children }) {
  return (
    <div>
      <div className="column">
        <img
          src={props.avatar}
          alt={`Avatar for ${username}`}
          className="avatar"
        />
        <h2 className='username'>@{username}</h2>
      </div>
      {children}
    </div>
  )
};

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

module.exports = PlayerPreview;
