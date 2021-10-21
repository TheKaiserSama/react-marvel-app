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
  fetchCharactersByComic,
  selectComicCharacterById
} from './comicCharactersSlice';

const ComicCharacterItem = ({ character }) => {
  const [show, setShow] = useState(false);
  const [characterId] = character.resourceURI.split('/').reverse();
  const characterDetails = useSelector(
    state => selectComicCharacterById(state, characterId)
  );

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        <strong>{character.name}</strong>
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
          <Modal.Title>Character details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Image src={characterDetails?.thumbnail} rounded thumbnail />
            </Col>
            <Col md={6}>
              <h4>{characterDetails?.name}</h4>
              <p>Comics: {characterDetails?.comics}</p>
              <p>Events: {characterDetails?.events}</p>
              <p>Series: {characterDetails?.series}</p>
              <p>Stories: {characterDetails?.stories}</p>
              <p>{characterDetails?.description}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </ListGroup.Item>
  );
};

const ComicCharacters = () => {
  const dispatch = useDispatch();
  const { comicId } = useParams();
  const { activeComic } = useSelector(state => state.comics);

  useEffect(() => {
    dispatch(fetchCharactersByComic(comicId));
  }, [dispatch, comicId]);

  let itemsComicCharacters;
  if (activeComic) {
    const { characters } = activeComic;
    // console.log('___', characters);
    itemsComicCharacters = characters.items.map(character => (
      <ComicCharacterItem 
        key={character.resourceURI.split('/').reverse()[0]}
        character={character}
      />
    ));
  }

  return (
    <ListGroup>
      {itemsComicCharacters}
    </ListGroup>
  );
};

export default ComicCharacters;
