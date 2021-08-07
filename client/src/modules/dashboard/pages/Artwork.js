import React from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";
import { useParams, useRouteMatch } from "react-router-dom";
import { Comment, Image, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

const Artwork = () => {
  const { url } = useRouteMatch();

  console.log(url)
  const { id } = useParams();
  const { isLoading, data } = useQuery(["artwork", id], () =>
    dashboardService.artwork(id)
  );

  const { isLoading: isLoadingComments, data: comments } = useQuery(
    ["comments", id],
    () => dashboardService.artComments(id)
  );

  const CommentContainer = () => {
    if (isLoadingComments) {
      return <div>Loading...</div>;
    } else {
      return comments.results.map((comment) => (
        <Comment
          key={comment.id}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          author={<a>{comment.commentor}</a>}
          content={<p>{comment.comment}</p>}
          datetime={
            <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      ));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div>
        <li key={data.id}>
          <Image width={200} src={data.image} />
        </li>
        <CommentContainer />
      </div>
    );
  }
};

export default Artwork;
