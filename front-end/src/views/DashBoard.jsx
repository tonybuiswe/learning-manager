import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { usePosts } from "../contexts/PostContext";
import { useAuth } from "../contexts/AuthContext";
import { SinglePost } from "../components/posts/SinglePost";

export function DashBoard() {
  const { authState } = useAuth();
  const { user } = authState;
  const { postState, getPosts } = usePosts();
  const { posts, postsLoading } = postState;

  useEffect(() => {
    getPosts();
  }, [postsLoading]);

  if (postsLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }

  if (!posts) {
    return (
      <Card className="tet-center mx-5 my-5">
        <Card.Header as="h1"> Hi {user.username}</Card.Header>
        <Card.Title>Welcome to {`{appName}`}</Card.Title>
        <Card.Text>
          Click the button below to track your first skill to learn
        </Card.Text>
        <Button></Button>
      </Card>
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
}