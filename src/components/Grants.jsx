import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import Header from './Header';
import endpoints from '../constants/endpoints';

const Grants = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.grants, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  const numberOfItems = showMore && data ? data.length : 6;

  return (
    <>
      <Header title={header} style={{ fontSize: '2em', fontWeight: 'bold' }} />
      <Container style={{ marginBottom: 25 }}>
        <Row>
          <Col>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {data?.slice(0, numberOfItems).map((grants, index) => (
                <Fade key={grants.id || index}>
                  <li style={{ marginBottom: '10px' }}>
                    <h2 className="item-title">
                      {`${grants.grants} - ${grants.year}`}
                    </h2>
                    <h4>
                      {grants.conference && ` - ${grants.conference}`}
                    </h4>
                    <br />
                  </li>
                </Fade>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Grants.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Grants;
