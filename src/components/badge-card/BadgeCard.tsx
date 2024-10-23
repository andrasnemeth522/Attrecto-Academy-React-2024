import React from "react";
import { BadgeModel } from "../../models/badges.model";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AccessController from "../access-controller/AccessController";
import { Button } from "../button/Button";

import classes from "./BadgeCard.module.scss";
import { Link } from "react-router-dom";
import { hasPermission } from "../../util/hasPermission";

interface BadgeCardProps {
  badge: BadgeModel;
  handleDeleteBadge: (badgeId: string) => void;
}

const BadgeCard = ({ badge, handleDeleteBadge }: BadgeCardProps) => {
  const { id, image, name, description } = badge;

  const allowedBadgeChangeFor: Role[] = ["ADMIN"];

  const showLink = hasPermission(allowedBadgeChangeFor);

  const badgeCardContent = (
    <div
      className={classNames(
        "d-flex box-shadow align-items-center",
        classes.Badge
      )}
    >
      <img
        src={image}
        alt={`badge #${id}`}
        className={classNames(classes.BadgeImage, "card-img-top")}
      />
      <div className="d-flex flex-column">
        <h5 className="ms-3">{name}</h5>
        <p className="ms-3 text-black-50">{description}</p>
      </div>
      <AccessController allowedFor={allowedBadgeChangeFor}>
        <Button
          className={classNames(classes.DeleteIcon)}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteBadge(id.toString());
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </AccessController>
    </div>
  );

  return showLink ? (
    <Link to={`/badge/${id}`} className={classNames("card", classes.BadgeCard)}>
      {badgeCardContent}
    </Link>
  ) : (
    <div className={classNames("card", classes.BadgeCard, classes.NotLink)}>
      {badgeCardContent}
    </div>
  );
};

export default BadgeCard;
