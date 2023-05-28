import { Button, Form, Modal } from "react-bootstrap";

export const AddPostModal = () => {
  return (
    <Modal show={true}>
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
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control type="text" placeholder="Resource URL" name="url" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};