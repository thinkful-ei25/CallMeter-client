import React from 'react';
import '../../styles/SubNav.css';

export default function SubNav(props) {

  if(props.page === 'individual-contact') {
    return (
      <section id="sub-nav">
        <div className="sub-nav">
          <div className="sub-nav-row">
            <div className="contact-view">
              <div className="view-select">
                <select value={props.view} onChange={e => props.toggleView(e)}>
                  <option value="">Select A View</option>
                  <option value="all">Details</option>
                  <option value="calls">Calls</option>
                  <option value="invoices">Invoices</option>
                  <option value="">Notes (Coming Soon)</option>
                </select>
                <div className="select-arrow" />
              </div>
            </div>
            <div className="add-contact">
              <div className="view-select">
                <select value={props.action} onChange={e => props.handleAction(e)}>
                  <option value="view">Actions</option>
                  <option value="redirecting">View All Contacts</option>
                  <option value="editing">Edit Contact</option>
                  <option value="deleting">Delete Contact</option>
                </select>
                <div className="select-arrow" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  } else {
  return (
    <section id="sub-nav">
      <div className="sub-nav">
        <div className="sub-nav-row">
          <div className="contact-search">
            <span>⌕</span>
            <input
              className="search"
              type="search"
              name="searchBox"
              value={props.searchTerm}
              onChange={e => props.setSearchTerm(e)}
              placeholder="Search by name"
            />
          </div>
          <div className="contact-view">
            <div className="view-select">
              <select value={props.view} onChange={e => props.toggleView(e)}>
                <option value="">Select View</option>
                <option value="clients">Contacts</option>
                <option value="stats">Stats</option>
              </select>
              <div className="select-arrow" />
            </div>
          </div>
          <div className="add-contact">
            <button
              className="add-contact-button"
              onClick={() => props.toggleAddClientForm()}
            >
              + Add Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
  }
}
