import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AudiobookPlayer from "../audiobookPlayer/AudiobookPlayer";

const ListenAudioBook = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${FETCH}books/${bookId}`);
        setBook(res.data);
        setIsLoading(false);
        setError(null);
        console.log("listen book:", res.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchBook();
  }, [bookId]);

  if (!book) return null;
  return <AudiobookPlayer book={book} singlePageStyle />;
};

export default ListenAudioBook;
