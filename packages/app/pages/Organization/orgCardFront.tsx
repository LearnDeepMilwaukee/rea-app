// React component for the frontside of the card
import has = Reflect.has;
import * as React from "react";
import * as themable from "react-themeable";
import * as cardTheme from "./cardStyle.scss";

class CardFront extends React.Component {


  render() {
    let org = this.props.card;
    let name = org.name;
    let tester = org.distance;
    let type = org.type;
    let note = org.note;
    let org_image = org.image;
    let card_theme = themable(cardTheme);
    let alt_desc = name + " logo";
    return(
      <span {...card_theme(0,"card")}>
        <img src={org_image} alt={alt_desc} {...card_theme(4,"img")}/>
        <h2 id="name" {...card_theme(1,"name")}>{name}</h2>
        <div {...card_theme(2,"details")}>
          <h3 id="type">{"Type: " + type}</h3>
          <h3 id="note">{"Distance: " }</h3>
          {/*<p id="note">{note}</p>*/} {/*Todo think this should be distance and not note*/}
          </div>
      </span>
  )
  }
}

export default CardFront;
