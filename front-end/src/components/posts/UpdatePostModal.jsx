import { Button, Form, Modal } from "react-bootstrap";
import { usePosts } from "../../contexts/PostContext";
import { useEffect, useState } from "react";

export const UpdatePostModal = () => {
  const { postState, updatePost, setToast, noEditPost } = usePosts();

  // States
  const [postValue, setPostValue] = useState(postState.postToEdit);

  useEffect(() => {
    setPostValue(postState.postToEdit);
  }, [postState.postToEdit]);

  const { title, description, url, status } = postValue || {};

  const onFormChange = (e) =>
    setPostValue({
      ...postValue,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updatePost(postValue);
    noEditPost();
    setToast({
      isShow: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };

  return (
    <Modal show={postState.postToEdit !== null} onHide={noEditPost}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to track</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onFormChange}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Select
              as="textarea"
              rows={3}
              name="status"
              value={status}
              onChange={onFormChange}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              type="text"
              placeholder="Resource URL"
              name="url"
              value={url}
              onChange={onFormChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={noEditPost}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Edit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};