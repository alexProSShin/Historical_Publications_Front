import "./BreadCrumbs.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FC } from "react";
import { RoutesEnum } from "@/router";
import { createPortal } from "react-dom";

interface ICrumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
  const { crumbs } = props;

  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById("bread-portal");
    setPortalEl(element);
  }, []);

  return portalEl
    ? createPortal(
        <ul className="my_breadcrumbs">
          <li>
            <Link to={RoutesEnum.Home}>Главная</Link>
          </li>
          {!!crumbs.length &&
            crumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <li className="slash">/</li>
                {index === crumbs.length - 1 ? (
                  <li>{crumb.label}</li>
                ) : (
                  <li>
                    <Link to={crumb.path || ""}>{crumb.label}</Link>
                  </li>
                )}
              </React.Fragment>
            ))}
        </ul>,
        portalEl
      )
    : null;
};
