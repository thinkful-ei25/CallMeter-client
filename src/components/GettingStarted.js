import React from 'react';
import '../styles/GettingStarted.css';



export default function GettingStarted(props) {
  return (
  <section>
    <div className="getting-started-card getting-started-wrapper intro-card">
      <div className="g-s-card-container">
        <div className="g-s-card-inner">
          <div className="margin-bottom-10">
            <header className="g-s-card-header">
              <div className="g-s-title-container">
                <span className="g-s-title-text">
                  {props.title}
                </span>
              </div>
            </header>
          </div>
          <div className="g-s-card-section">
            <div className="g-s-image">
                <img src={props.image} className="getting-started-image" alt="getting-started-image" />
            </div>
            <h3 className="g-s-heading">{props.text}</h3>
            <div className="g-s-sub-text-container"><span className="g-s-sub-text"></span>{props.subtext}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}