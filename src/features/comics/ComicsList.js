import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ReactPaginate from 'react-paginate';

import { 
  fetchComics,
  selectComicIds,
  selectComicById,
  filtersUpdated
} from './comicsSlice';
import Spinner from '../../components/Spinner';

const ComicItem = ({ comicId }) => {
  const history = useHistory();
  const comic = useSelector(state => selectComicById(state, comicId));

  const handleComicSelected = () => {
    history.push(`/comics/${comic.id}`);
  };

  return (
    <Col onClick={handleComicSelected}>
      <Card className="custom-card">
        <Card.Img variant="top" src={comic.thumbnail} />
        <Card.Body>
          <Card.Title>{comic.title}</Card.Title>
          <Card.Text>
            {comic.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ComicsSearchBar = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleSearchComics = (e) => {
    e.preventDefault();
    const titleStartsWith = value.length >= 1 ? value : null;

    dispatch(fetchComics({ 
      limit: 20, 
      offset: 0,
      titleStartsWith
    }));
    dispatch(filtersUpdated({ currentPage: 0 }));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSearchComics} >
        <Form.Group className="mb-5">
          <Form.Control 
            type="text"
            placeholder="Search comics"
            value={value}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
          />
        </Form.Group>
      </form>
    </>
  );
};

const ComicsControls = ({ comicStatus }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.comics);
  const { limit, total, titleStartsWith, currentPage } = filters;
  // const filters = useSelector(state => state.comics.filters);

  const onPageChange = ({ selected }) => {
    const offset = Math.ceil(selected * limit);
    dispatch(fetchComics({ offset, titleStartsWith }));
    dispatch(filtersUpdated({ currentPage: selected }));
  };

  // let content;
  // if (comicStatus === 'succeeded') {
  //   content = '';
  // }

  return (
    <>  
      <Row className="d-flex justify-content-between my-4">
        <ReactPaginate
          pageCount={Math.ceil(total / limit)}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          containerClassName={'pagination'}
          activeClassName={'active'}
          onPageChange={onPageChange}
          forcePage={currentPage}
        />
      </Row>
    </>
  );
}

const ComicsList = () => {
  const dispatch = useDispatch();
  const comicIds = useSelector(selectComicIds);

  const comicStatus = useSelector(status => status.comics.status);
  const error = useSelector(status => status.comics.error);

  useEffect(() => {
    if (comicStatus === 'idle') {
      dispatch(fetchComics());
    }
  }, [comicStatus, dispatch]);

  let content;

  if (comicStatus === 'loading') {
    content = <Spinner />;
  } else if (comicStatus === 'succeeded') {
    content = comicIds.map(comicId => (
      <ComicItem key={comicId} comicId={comicId} />
    ));
  } else if (comicStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <Container fluid="lg">
      <h1 className="my-4">Comics</h1>
      <ComicsSearchBar />
      <Row xs={1} md={3} lg={4} className="g-4">
        {content}
      </Row>
      <ComicsControls comicStatus={comicStatus} />
    </Container>
  );
};

export default ComicsList;
