// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import theme from "./cardStyle.scss";


var curr_theme = themable(theme);

class CardFront extends React.Component {
  render() {
    return(
      <div className='card-container'>
      <div className='card-body'>
      <div className='card-side side-front'>
      <div className='container-fluid'>
      <div className='row'>
      <div className='col-xs-6'>
      <img src='https://source.unsplash.com/w8YICpz1I10/358x458' />
        </div>

        <div className='col-xs-6 side-front-content'>
      <h2 {...curr_theme(0,"h2")}>Czech based</h2>

    <h1>UI/UX Designer</h1>

    <p>Andrey is driven by turning ideas into scalable and and empowering experiences that solve real life problems.</p>

    <p>He is currently the founder of Dvorak Media. Previously, Andrey was a product designer at Dropbox.</p>

    <p>Over the years, Michael has been priviledged to have worked with Adobe, Evernote, Square and more.</p>
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
