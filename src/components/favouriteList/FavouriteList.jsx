import { useEffect, useState } from 'react';
import ContentList from '../contentList/ContentList';

function FavouriteList({ catagory, favourites }) {
  const [sortFavourites, setSortFavourites] = useState([]);

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
