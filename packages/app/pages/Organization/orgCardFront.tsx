// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import * as theme from "./cardStyle.scss";
// import '';



class CardFront extends React.Component {


  render() {
    let curr_theme = themable(theme);

    return(
      <div {...curr_theme(0,".card")} className='card-container'>
      <div className='card-body'>
      <div className='card-side side-front'>
      <div className='container-fluid'>
      <div className='row'>
      <div className='col-xs-6'>
        </div>

        <div className='col-xs-6 side-front-content'>
      <h2 id="h2">Czech based</h2>
    <h1 id="h1">UI/UX Designer</h1>
    <p id="p1">Andrey is driven by turning ideas into scalable and and empowering experiences that solve real life problems.</p>
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
