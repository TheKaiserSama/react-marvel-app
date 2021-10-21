import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { 
  selectComicCreatorById,
  fetchCreatorsByComic 
} from './comicCreatorsSlice';

const ComicCreatorItem = ({ creator }) => {
  const [show, setShow] = useState(false);
  const [creatorId] = creator.resourceURI.split('/').reverse();
  const creatorDetails = useSelector(
    state => selectComicCreatorById(state, creatorId)
  );

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        <strong>{creator.name}</strong> {creator.role}
      </p>
      <Button 
        variant="outline-primary" 
        size="sm"
        onClick={() => setShow(true)}
      >
        Show more
      </Button>

      <Modal size="lg" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Creator details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Image src={creatorDetails?.thumbnail} rounded thumbnail />
            </Col>
            <Col md={6}>
              <h4>{creatorDetails?.fullName}</h4>
              <p>Comics: {creatorDetails?.comics}</p>
              <p>Events: {creatorDetails?.events}</p>
              <p>Series: {creatorDetails?.series}</p>
              <p>Stories: {creatorDetails?.stories}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </ListGroup.Item>
  );
};

const ComicCreators = () => {
  const dispatch = useDispatch();
  const { comicId } = useParams();
  const { activeComic } = useSelector(state => state.comics);

  useEffect(() => {
    dispatch(fetchCreatorsByComic(comicId));
  }, [dispatch, comicId]);

  let itemsComicCreators;
  if (activeComic) {
    const { creators } = activeComic;
    itemsComicCreators = creators.items.map(creator => (
      <ComicCreatorItem 
        key={creator.resourceURI.split('/').reverse()[0]} 
        creator={creator} 
      />
    ));
  }

  return (
    <ListGroup className="mt-4">
      {itemsComicCreators}
    </ListGroup>
  );
};

export default ComicCreators;
