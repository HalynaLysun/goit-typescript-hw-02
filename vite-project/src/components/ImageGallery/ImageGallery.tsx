import { ImageCard } from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Images } from "../../types";
import React from "react";

interface ImageGalleryProps {
  images: Images;
  onClick: () => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onClick,
}) => {
  console.log(images);
  return (
    <ul className={css.list}>
      {images.map((el: Images) => {
        return (
          <li key={el.id}>
                <ImageCard images={el} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
};
