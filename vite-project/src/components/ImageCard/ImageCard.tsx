import css from "./ImageCard.module.css";
import { Images } from "../../types";
import React from "react";

interface ImageCardProps {
  images: Images;
  onClick: (img: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ images, onClick }) => {
  return (
    <div>
      <img
        className={css.image}
        src={images.urls.small}
        alt={images.alt_description}
        onClick={() => onClick(images.urls.regular)}
      />
    </div>
  );
};
