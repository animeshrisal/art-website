import {
  authenticatedGetRequestOption,
  authenticatedRequestGenerator,
  handleResponse,
  URL,
} from "../../helpers";

const imageUpload = (artwork) => {
  console.log(artwork);
  return fetch(
    `${URL}/dashboard/upload/`,
    authenticatedRequestGenerator(artwork, "POST")
  )
    .then(handleResponse)
    .then((artwork) => {
      return artwork;
    });
};

const getFeed = () => {
  return fetch(`${URL}/dashboard/feed/`, authenticatedGetRequestOption())
    .then(handleResponse)
    .then((artworks) => {
      return artworks;
    });
};

const artwork = (artworkId) => {
  return fetch(
    `${URL}/dashboard/artwork/${artworkId}`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((artworks) => {
      return artworks;
    });
};

const artComments = (artworkId) => {
  return fetch(
    `${URL}/dashboard/artwork/${artworkId}/comment/`,
    authenticatedGetRequestOption()
  )
    .then(handleResponse)
    .then((artworks) => {
      return artworks;
    });
}

const postComment = (artworkId, comment) => {
  return fetch(
    `${URL}/dashboard/artwork/${artworkId}/comment/`,
    authenticatedRequestGenerator(comment, "POST")
  )
    .then(handleResponse)
    .then((comment) => {
      return comment;
    });
}

export const dashboardService = {
  imageUpload,
  getFeed,
  artwork,
  artComments,
  postComment
};
