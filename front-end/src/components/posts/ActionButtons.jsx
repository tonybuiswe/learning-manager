import { Button } from "react-bootstrap";
import { Pencil, PlayBtn, Trash } from "react-bootstrap-icons";

export const ActionButtons = ({ url, _id }) => {
  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <PlayBtn width={32} height={32} className="text-primary" />
      </Button>
      <Button className="post-button">
        <Pencil width={24} height={24} className="text-info" />
      </Button>
      <Button className="post-button">
        <Trash width={24} height={24} className="text-danger" />
      </Button>
    </>
  );
};