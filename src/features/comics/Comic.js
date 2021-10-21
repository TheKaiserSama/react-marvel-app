import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  useParams, 
  useRouteMatch, 
  useHistory,
  NavLink, 
  Switch, 
  Route,
  Redirect
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { fetchComicById } from './comicsSlice';
import ComicCharacters from './ComicCharacters';
import ComicCreators from './ComicCreators';

const Comic = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { comicId } = useParams();
  const { path, url } = useRouteMatch();
  const comic = useSelector(state => state.comics.activeComic);
  let comicInfo;

  useEffect(() => {
    dispatch(fetchComicById(comicId));
  }, [dispatch, comicId]);

  const handleBack = () => {
    history.push('/comics');
  };

  if (comic) {
    comicInfo = <>
      <Card>
        <Card.Img variant="top" src={comic.thumbnail} />
        <Card.Body>
          <Card.Title>{comic.title}</Card.Title>
          <Card.Text>
            {comic.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>;
  }

  return (
    <Container fluid="lg" className="mt-4">
      <Row>
        <Col md={3}>
          {comicInfo}
          <Button 
            variant="danger" 
            className="mt-3 w-100"
            onClick={handleBack}
          >
            Back
          </Button>
        </Col>

        <Col md={9}>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link as={NavLink} to={`${url}/characters`}>
                Characters <Badge pill bg="primary">{comic?.characters.available}</Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to={`${url}/creators`}>
                Creators <Badge pill bg="primary">{comic?.creators.available}</Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to={`${url}/events`}>
                Events <Badge pill bg="primary">{comic?.events.available}</Badge>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to={`${url}/stories`}>
                Stories <Badge pill bg="primary">{comic?.stories.available}</Badge>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Switch>
            <Route exact path={`${path}/characters`} component={ComicCharacters} />
            <Route exact path={`${path}/creators`} component={ComicCreators} />
            <Redirect to={`${url}/characters`} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
};

export default Comic;
