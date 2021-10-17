import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { dashboardService } from "../DashboardService";
import { useParams } from "react-router-dom";
import { Comment, Image, Tooltip, Input, Button, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { DateTime } from "luxon";

import "../styling/Artwork.scss";

const Artwork = () => {
  const dt = Date.now();
  const [comment, setComment] = useState('')
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
    mutation.mutate({ comment })
  }

  const TagList = (props) => {
    return props.tagList.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)
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
              src={`http://localhost:8000${comment.user.profilePic}`}
              alt="Han Solo"
            />
          }
          author={<a>{comment.user.username}</a>}
          content={<p>{comment.comment}</p>}
          datetime={
            <Tooltip title={DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED)}>
              <span>{DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED)}</span>
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
      <div className="container">
        <div className="image-container">
          <Image width={400} preview={false} src={data.image} />
        </div>
        <div className="tags-container">
          Tags: <TagList tagList={data.tags} />
        </div>
        <TextArea value={comment} onChange={e => setComment(e.target.value)} rows={2} />
        <Button disabled={!comment} loading={mutation.isLoading} onClick={() => postComment()} >Comment</Button>
        <CommentContainer />
      </div>
    );
  }
};

export default Artwork;
