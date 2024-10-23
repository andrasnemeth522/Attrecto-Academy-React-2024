import React, { useCallback, useState, useEffect } from "react";

import { Page } from "../../components/page/Page";
import { BadgeModel } from "../../models/badges.model";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import BadgeCard from "../../components/badge-card/BadgeCard";
import AccessController from "../../components/access-controller/AccessController";
import { badgesService } from "../../services/badges.service";

const BadgesPage = () => {
  const [badges, setBadges] = useState<BadgeModel[]>([]);

  const navigate = useNavigate();

  const fetchBadges = useCallback(async () => {
    setBadges(await badgesService.getBadges());
  }, []);

  useEffect(() => {
    fetchBadges();
  }, [fetchBadges]);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgesService.getBadges());
    };
    fetchBadges();
  }, []);

  const goToBadgePage = () => {
    navigate("/badge");
  };

  const handleDeleteBadge = async (id: string | number) => {
    await badgesService.deleteBadge(id);
    fetchBadges();
  };

  return (
    <Page title="Badges">
      <AccessController allowedFor={["ADMIN"]}>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <Button
              color="primary"
              className="w-100 mb-3"
              onClick={goToBadgePage}
            >
              Create Badge
            </Button>
          </div>
        </div>
      </AccessController>
      <div className="row">
        {badges.map((badge) => (
          <div key={badge.id} className="col-lg-4 col-md-6 col-sm-12">
            <BadgeCard badge={badge} handleDeleteBadge={handleDeleteBadge} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default BadgesPage;
