import { Button } from "react-bootstrap";
import { Pencil, PlayBtn, Trash } from "react-bootstrap-icons";
import { usePosts } from "../../contexts/PostContext";

export const ActionButtons = ({ url, _id }) => {
  const { deletePost, editPost } = usePosts();
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <PlayBtn width={32} height={32} className="text-primary" />
      </Button>
      <Button className="post-button" onClick={editPost.bind(this, _id)}>
        <Pencil width={24} height={24} className="text-info" />
      </Button>
      <Button className="post-button" onClick={deletePost.bind(this, _id)}>
        <Trash width={24} height={24} className="text-danger" />
      </Button>
    </>
  );
};