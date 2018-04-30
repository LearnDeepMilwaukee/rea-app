import * as React from "react";
import { Link } from "react-router";
import * as themeable from "react-themeable";
import { SFC } from "react";
import CurrentUser from "@vflows/bindings/user/CurrentUser";
import Link from "../../atoms/Link";
import { Bell, Search, Horizontal } from "../../icons";
import Dropdown from "./dropdownMenu";

interface UserProps {
  user?: {
    name: string,
    image: string
  },
  loading?: boolean,
  error?: Error,
  theme: Object,
}

const Header = CurrentUser(({ user, loading, error, theme }: UserProps) => {
    let currentTheme = themeable(theme);
    return (
        loading ? <strong>Loading...</strong> : (error ? <p style={{ color: "#F00" }}>API error</p> : (
        <header {...currentTheme(0, "main_header")} >
          <div {...currentTheme(1, "row")}>
            <div id="ttHomeButton">
                <Link href="/"><span  {...currentTheme(2, "header_logo")} /></Link>
            </div>
            <div {...currentTheme(4, "header_search")} >
              <input {...currentTheme(5, "search", "input")} placeholder="Searching Disabled" />
              <span {...currentTheme(6, "search_icon")}><Search /></span>
            </div>
            <div {...currentTheme(3, "header_menu")} >
                  <div {...currentTheme(14, "menu_profile")} >
                    <div {...currentTheme(15, "profile_image")}>
                      <img src={user.image} />
                    </div>
                    <h4>{user.name || "nobody"}</h4>
                    <span {...currentTheme(16, "profile_other")}>
                      <div {...currentTheme(17, "dropdown")}>
                        <span>°°°</span>
                        <div {...currentTheme(18, "dropdown-content")}>
                          {/*This is where you can add new menu items*/}
                          <Link to={"/"} {...currentTheme(19, "link")}>home</Link>
                        </div>
                      </div>
                    </span>
                </div>
            </div>
            <div {...currentTheme(284484, "header_mobile")}>
              <ul {...currentTheme(24449, "mobile_list")}>
                <li {...currentTheme(22383, "active")}>Projects</li>
                <li>Activities</li>
                <li>Profile</li>
                <li>Notifications</li>
              </ul>
            </div>
          </div>
        </header>
      )
    ));
});

export default Header;
