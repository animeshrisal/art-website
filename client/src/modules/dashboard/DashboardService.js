import { authenticatedRequestGenerator, handleResponse, URL } from "../../helpers";

const imageUpload = (artwork) => {
    console.log(artwork)
    return fetch(
      `${URL}/dashboard/upload/`, authenticatedRequestGenerator(artwork, "POST"))
      .then(handleResponse)
      .then((artwork) => {
        return artwork
      })
    
  }    

export const dashboardService = {
    imageUpload
};
