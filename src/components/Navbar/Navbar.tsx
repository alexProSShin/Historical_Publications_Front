import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getRoute, RoutesEnum } from "@/router";
import { useAppSelector } from "@/core/store/store";

import { useAuthState } from "@/core/store/useAuthState";
import { logoutUser } from "@/core/api/user.api";
import publicationImage from "@assets/publication.svg";

export const Navbar = () => {
  console.log("navbar rendered");

  const location = useLocation();
  const navigate = useNavigate();

  const { IS_GUEST, clearAllAppData, userData } = useAuthState();
  const { eventsCount, publicationId } = useAppSelector((state) => state.app);
  const name = userData?.name;

  const IS_PUB_ICON = !IS_GUEST && location.pathname === RoutesEnum.Events;

  const handlePubsClick = () => {
    navigate(RoutesEnum.Publications);
  };
  const handleEventsClick = () => {
    navigate(RoutesEnum.Events);
  };
  const handleSettingsClick = () => {
    navigate(RoutesEnum.User);
  };

  const handleLogoutClick = () => {
    logoutUser().finally(() => {
      clearAllAppData();
    });
  };

  return (
    <nav className="my_navbar">
      {/* left part */}
      <div id="bread-portal"></div> {/* !!!!!!! important */}
      {/* right part */}
      <div className="my_navbar__right-part">
        {IS_GUEST ? (
          <Link to={RoutesEnum.Login}>
            <Button>Войти</Button>
          </Link>
        ) : (
          <>
            <p className="my_navbar__right-part__name">{name}</p>
            {IS_PUB_ICON && (
              <Link
                to={
                  publicationId
                    ? getRoute(RoutesEnum.PublicationById, publicationId)
                    : "#"
                }
                className="publication-link"
              >
                <img
                  src={publicationImage}
                  alt=""
                  className={`publication-icon ${publicationId ? "active" : ""}`}
                />
                <span className="event-count">{eventsCount}</span>
              </Link>
            )}
            <DropdownButton
              id="dropdown-item-button"
              variant="secondary"
              title="Больше"
            >
              <Dropdown.Item as="button" onClick={handleEventsClick}>
                События
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handlePubsClick}>
                Публикации
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleSettingsClick}>
                Настройки
              </Dropdown.Item>
              <Dropdown.Item
                onClick={handleLogoutClick}
                as="button"
                style={{ color: "red" }}
              >
                Выйти
              </Dropdown.Item>
            </DropdownButton>
          </>
        )}
      </div>
    </nav>
  );
};
