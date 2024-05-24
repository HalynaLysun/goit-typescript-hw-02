import { SearchBar } from "./SearchBar/SearchBar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Loader from "./Loader/Loader";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import { ImageModal } from "./ImageModal/ImageModal";
import fetchImages from "../images-api";
import { useState, useEffect } from "react";
import { Images } from "../types";

export default function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [images, setImages] = useState<Images[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<string>("");

  const handleChange = (newInputValue: string): void => {
    setInputValue(newInputValue);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    async function fetchImagesGallery<T>(): Promise<T | undefined> {
      try {
        if (!inputValue) {
          return;
        }
        setLoading(true);

        interface Data {
          results: [];
        }

        const data: Data = await fetchImages(inputValue, page);
        const newImages: Images[] = data.results;
        setImages((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchImagesGallery();
  }, [inputValue, page]);

  const handleModal = (imageUrl: string): void => {
    setModal(!modal);
    setImageModal(imageUrl);
  };

  return (
    <>
      <SearchBar onSubmit={handleChange} />
      {images.length > 0 && (
        <ImageGallery images={images} onClick={handleModal} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal isOpen={modal} onClick={handleModal} imageUrl={imageModal} />
    </>
  );
}
