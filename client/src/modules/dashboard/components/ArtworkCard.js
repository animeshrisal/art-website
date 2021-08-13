import { Image } from "antd";
import React from "react";

const ArtworkCard = (props) => {

    const goToDetailsPage = () => {
        props.goToDetailPage(props.id)
    }
    return(
        <div onClick={goToDetailsPage}>
             <Image preview={false} width={200} src={props.image} />
        </div>
    )
}

export default ArtworkCard