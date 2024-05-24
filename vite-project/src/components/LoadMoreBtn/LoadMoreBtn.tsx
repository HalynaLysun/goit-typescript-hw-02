import css from "./LoadMoreBtn.module.css";
import React from "react";

interface SerchBarProps {
  onClick: () => void;
}

export const LoadMoreBtn: React.FC<SerchBarProps> = ({ onClick }) => {
  return (
    <>
      <button className={css.btn} onClick={onClick}>
        Load more
      </button>
    </>
  );
};
