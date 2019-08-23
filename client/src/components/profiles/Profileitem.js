import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Profileitem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>{location}</span>}
        </p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
};

Profileitem.propTypes = {
  profile: PropTypes.func.isRequired
};

export default Profileitem;
