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
      <div {...card_theme(0,"card")}>
        <h2 id="name" {...card_theme(1,"name")}>{name}</h2>
        <div {...card_theme(2,"details")}>
          <h3 id="type">{type}</h3>
          <p id="note">{note}</p>
        </div>
      </div>
  )
  }
}

export default CardFront;
