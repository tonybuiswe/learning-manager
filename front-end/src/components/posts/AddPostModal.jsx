import { Button, Form, Modal } from "react-bootstrap";
import { usePosts } from "../../contexts/PostContext";
import { useEffect, useState } from "react";

export const AddPostModal = () => {
  const { isAddPostModalVisible, closeAddPostModal, addPost } = usePosts();

  // States
  const [postValue, setPostValue] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const resetPostValue = () => {
    setPostValue({ title: "", description: "", url: "", status: "TO LEARN" });
  };

  const { title, description, url } = postValue;
  useEffect(() => {
    if (isAddPostModalVisible) {
      resetPostValue();
    }
  }, [isAddPostModalVisible]);

  const onFormChange = (e) =>
    setPostValue({
      ...postValue,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(postValue);
    closeAddPostModal();
    resetPostValue();
  };

  return (
    <Modal show={isAddPostModalVisible} onHide={closeAddPostModal}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn</Modal.Title>
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
          <Button variant="secondary" onClick={closeAddPostModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};