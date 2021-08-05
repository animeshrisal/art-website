import { authenticatedGetRequestOption, authenticatedRequestGenerator, handleResponse, URL } from "../../helpers";

const imageUpload = (artwork) => {
    console.log(artwork)
    return fetch(
      `${URL}/dashboard/upload/`, authenticatedRequestGenerator(artwork, "POST"))
      .then(handleResponse)
      .then((artwork) => {
        return artwork
      })
    
  }    

const getFeed = () => {
    return fetch(
        `${URL}/dashboard/feed/`, authenticatedGetRequestOption())
        .then(handleResponse)
        .then((artworks) => {
          return artworks
        })
      
}

export const dashboardService = {
    imageUpload,
    getFeed
};
