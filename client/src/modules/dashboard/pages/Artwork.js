import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { dashboardService } from "../DashboardService";
import { useParams } from "react-router-dom";
import { Comment, Image, Tooltip, Input, Button, Spin } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

const Artwork = () => {
  const [ comment, setComment ] = useState('')
  const { TextArea } = Input;
  const { id } = useParams();
  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(["artwork", id], () =>
    dashboardService.artwork(id)
  );

  const mutation = useMutation((comment) => dashboardService.postComment(id, comment), {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id])
      setComment('')
    }
  })

  const { isLoading: isLoadingComments, data: comments } = useQuery(
    ["comments", id],
    () => dashboardService.artComments(id)
  );

  const postComment = () => {
    mutation.mutate({comment})
  }

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
        <TextArea  value={comment} onChange={e => setComment(e.target.value)} rows={2} />
        <Button disabled={!comment} loading={mutation.isLoading} onClick={() => postComment()} >Comment</Button>
        <CommentContainer />
      </div>
    );
  }
};

export default Artwork;
