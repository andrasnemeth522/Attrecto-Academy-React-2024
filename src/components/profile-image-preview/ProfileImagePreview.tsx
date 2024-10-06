import React from "react";

interface ProfileImagePreviewProps {
  imageUrl: string;
}

export const ProfileImagePreview: React.FC<ProfileImagePreviewProps> = ({
  imageUrl,
}) => {
  return (
    <img
      src={imageUrl}
      className="object-fit-contain border rounded img-fluid"
    />
  );
};
