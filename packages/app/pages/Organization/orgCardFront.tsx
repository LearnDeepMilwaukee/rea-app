// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import * as theme from "./cardStyle.scss";
// import '';



class CardFront extends React.Component {


  render() {
    let curr_theme = themable(theme);
    let org = this.props.card;
    let name = org.name;
    let type = org.type;
    let note = org.note;

    return(
      <div {...curr_theme(0,".card")} className='card-container'>
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
    <p id="p2">He is currently the founder of Dvorak Media. Previously, Andrey was a product designer at Dropbox.</p>
    <p id="p3">Over the years, Michael has been priviledged to have worked with Adobe, Evernote, Square and more.</p>
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
