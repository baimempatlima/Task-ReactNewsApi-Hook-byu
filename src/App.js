import React, { useState, useEffect } from "react";
import { Container, Col, Row, Navbar } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import SearchForm from "./SearchForm";
import CardBerita from "./CardBerita";
import ListBerita from "./ListBerita";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState("everything");
  const [isLoading, setIsLoading] = useState(true);
  const [toogle, setToogle] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${term}&apiKey=${process.env.REACT_APP_ARTICLES_API_KEY}`);
        const articles = await res.json();
        console.log(articles);
        setArticles(articles.articles);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticles();
  }, [term]);

  return (
    <div>
      <Navbar className="navbarr" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Baim News</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <SearchForm searchText={(text) => setTerm(text)} />
        {isLoading && (
          <div className="Box">
            <Oval color="#00BFFF" height={80} width={80} />
          </div>
        )}
        <div className="toogle-btns">
          <i className="fas fa-list" onClick={() => setToogle(true)}></i>
          <i className="fas fa-th-large" onClick={() => setToogle(false)}></i>
        </div>
        {toogle ? (
          <Container>
            <Row>
              <Col>
                <Row>{articles && articles.map((brt, i) => <ListBerita brt={brt} key={brt.title + i} />)}</Row>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row>
              <Col>
                {/* <Row>
                {articles.map((article) => {
                  const {
                    urlToImage,
                    title,
                    description,
                    url,
                    source: {id, name },
                  } = article;
                  return (
                    <Col md={4}>
                      <Card className="margin" style={{ width: "21.8rem" }}>
                        <article key={id}>
                          <Card.Img className="cardimg" variant="top" src={urlToImage} />
                          <Card.Body>
                            <Card.Title className="cardtitle">{title}</Card.Title>
                            <Card.Text className="cardtext">{description}</Card.Text>
                            <Button className="buttonP" variant="primary" href={url}>
                              {name}{" "}
                            </Button>
                          </Card.Body>
                        </article>
                      </Card>
                    </Col>
                  );
                })}
              </Row> */}
                <Row>{articles && articles.map((brt, i) => <CardBerita brt={brt} key={brt.title + i} />)}</Row>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default App;
