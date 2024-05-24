import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";
import React from "react";

interface SerchBarProps {
  onSubmit: (query: string) => void;
}

export const SearchBar: React.FC<SerchBarProps> = ({ onSubmit }) => {
  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const query = (
      form.elements.namedItem("search") as HTMLInputElement
    ).value.trim();
    const notify = () => toast("Please enter the text to search for images!");

    {
      query === "" && notify();
    }

    onSubmit(query);

    form.reset();
  }
  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <Toaster />
        <input
          className={css.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
