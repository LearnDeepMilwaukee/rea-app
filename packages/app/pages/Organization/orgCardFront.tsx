// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import * as cardTheme from "./cardStyle.scss";



class CardFront extends React.Component {


  render() {
    let org = this.props.card;
    let name = org.name;
    let type = org.type;
    let note = org.note;
    let card_theme = themable(cardTheme);


    return(
      <span {...card_theme(0,".card")}>
        <span><card-container id="name">{name}</card-container></span>
        <span><card-container id="type">{type}</card-container></span>
        <span><card-container id="note">{note}</card-container></span>
      </span>
  )
  }
}

export default CardFront;
