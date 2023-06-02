import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Toast,
  Tooltip,
} from "react-bootstrap";
import { usePosts } from "../contexts/PostContext";
import { useAuth } from "../contexts/AuthContext";
import { SinglePost } from "../components/posts/SinglePost";
import { AddPostModal } from "../components/posts/AddPostModal";
import { PlusCircleFill } from "react-bootstrap-icons";

export function DashBoard() {
  const { authState } = useAuth();
  const { user } = authState;
  const { postState, getPosts, openAddPostModal, toast, setToast } = usePosts();
  const { posts, postsLoading } = postState;

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const getDashBoard = () => {
    if (!user || postsLoading) {
      return (
        <div className="spinner-container">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <>
          <Card className="text-center mx-5 my-5">
            <Card.Header as="h1"> Hi {user.username}</Card.Header>
            <Card.Body>
              <Card.Title>Welcome to {`{appName}`}</Card.Title>
              <Card.Text>
                Click the button below to track your first skill to learn
              </Card.Text>
              <Button variant="primary" onClick={openAddPostModal}>
                Start Learning By Adding Your First Study Card
              </Button>
            </Card.Body>
          </Card>
          <AddPostModal />
        </>
      );
    }

    return (
      <Row className="row-cols-1 row-cols-3 g-4 mx-auto mt-3">
        {posts.map((post) => (
          <Col key={post._id} className="my-2">
            <SinglePost post={post} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <>
      {getDashBoard()}
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Add new post</Tooltip>}
        onHide={null}
      >
        <Button className="btn-floating" onClick={openAddPostModal}>
          <PlusCircleFill width={60} height={60} className="text-primary" />
        </Button>
      </OverlayTrigger>

      <AddPostModal />
      <Toast
        show={toast.isShow}
        style={{
          position: "fixed",
          top: "20%",
          right: "10px",
          width: "fit-content",
          opacity: "95%",
        }}
        className={`bg-${toast.type} text-white`}
        onClose={() =>
          setToast({
            isShow: false,
            message: "",
            type: null,
          })
        }
        delay={3000}
        autohide
        animation={false}
      >
        <Toast.Body>
          <strong>{toast.message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
}