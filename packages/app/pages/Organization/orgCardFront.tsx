// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";

class CardFront extends React.Component {


  render() {
    let org = this.props.card;
    let name = org.name;
    let type = org.type;
    let note = org.note;

    return(
      <div className='card-container' class="org-card card-container">
        <div className='card-body'>
          <div className='card-side side-front'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-xs-6'>
                </div>
                <div className='col-xs-6 side-front-content'>
                  <h1 id="name">{name}</h1>
                  <h2 id="type">{type}</h2>
                  <p id="note">{note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
  }
}

export default CardFront;
