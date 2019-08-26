import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img
        className="round-img my-1"
        // replace next line with src={avatar} alt=''/>
        src={
          "data:image/jpeg;base64,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"
        }
        alt=""
      />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>(location}</span>}</p>
      <p>Seattle, WA</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
