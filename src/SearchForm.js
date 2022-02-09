import React, { useState } from "react";
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";

const SearchForm = ({ searchText }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };
  return (
    <div className="margin-cari">
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={8}>
            <Form className="margin-search" onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <FormControl aria-label="Recipient's username" aria-describedby="basic-addon2" placeholder="Ketik Topik Berita Disini" onChange={(e) => setText(e.target.value)} />
                <Button variant="primary" id="button-addon2" type="submit">
                  Cari
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default SearchForm;
