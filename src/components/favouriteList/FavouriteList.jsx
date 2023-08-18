import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import ContentList from '../contentList/ContentList';

function FavouriteList({ catagory, setFavoriteList }) {
  const { auth, fetchAgain } = ContentState();

  const [favourites, setFavourites] = useState([]);
  const [sortFavourites, setSortFavourites] = useState([]);

  // FETCH FAVOURITE CONTENT
  const favouriteContents = async () => {
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/favouriteList`,
        config(auth)
      );
      setFavourites(data[0].favourite);
      setFavoriteList(data[0].favourite);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    favouriteContents();
  }, [fetchAgain]);

  useEffect(() => {
    if (catagory) {
      const filterCatagory = favourites.filter(
        (favourite) => favourite.catagory === catagory
      );
      setSortFavourites(filterCatagory);
    }
  }, [catagory]);

  return (
    <>
      {catagory === null
        ? favourites.map((favourite) => (
          <ContentList
            key={favourite._id}
            content={favourite}
            favourites={favourites}
          />
        ))
        : sortFavourites.map((sort) => (
          <ContentList
            key={sort._id}
            content={sort}
            favourites={favourites}
          />
        ))}
    </>
  );
}

export default FavouriteList;
