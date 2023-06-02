import { Badge, Card, Col, Row } from "react-bootstrap";
import React from "react";
import { ActionButtons } from "./ActionButtons";

export const SinglePost = ({ post }) => {
  const { _id, status, title, description, url } = post;

  const progressColor = (() => {
    if (status === "LEARNED") return "success";
    if (status === "LEARNING") return "warning";

    return "danger";
  })();

  return (
    <Card className="shadow" border={progressColor}>
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge pill className={`bg-${progressColor}`}>
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};