import SpinnerRB from 'react-bootstrap/Spinner';

const Spinner = () => {
  return (
    <SpinnerRB animation="border" role="status" className="mx-auto">
      <span className="visually-hidden">Loading...</span>
    </SpinnerRB>
  );
};

export default Spinner;
