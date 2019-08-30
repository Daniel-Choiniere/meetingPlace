import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Profileitem = ({
  profile: {
    user: { _id, name },
    status,
    company,
    location,
    skills, 
    githubusername
  }
}) => {
  return (
    <div className="profile bg-light">
      <img src={`https://github.com/${githubusername}.png`} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span>{location}</span>}
        </p>
        <Link to={`/profile/${_id}`} className="btn btn-dark">
          View Profile
        </Link>
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

Profileitem.propTypes = {
  profile: PropTypes.func.isRequired
};

export default Profileitem;
