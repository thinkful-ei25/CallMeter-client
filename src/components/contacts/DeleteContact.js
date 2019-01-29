import React from 'react';
import { deleteClient } from '../../actions/index.actions';

export default function DeleteClient(props) {
  return (
    <div className="deleteClient">
      <span>Are you sure you want to delete {props.name}? </span>
      <button
        className="contact-button delete"
        onClick={() => {
          props.dispatch(deleteClient(props.id)).then(props.redirect());
        }}
      >
        <span aria-label="x" role="img">
          Delete
        </span>
      </button>
      <h2>
        <button className="backButton" onClick={() => props.toggle()}>
          Cancel ⬅
        </button>
      </h2>
    </div>
  );
}
