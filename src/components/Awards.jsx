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

const Awards = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.awards, { method: 'GET' })
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
              {data?.slice(0, numberOfItems).map((award, index) => (
                <Fade key={award.id || index}>
                  <li style={{ marginBottom: '10px' }}>
                    <h2 className="item-title">
                      {`${award.award} - ${award.year}`}
                    </h2>
                    <h4>
                      {award.conference && ` - ${award.conference}`}
                    </h4>
                    <h5>
                      {award.university && ` - ${award.university}`}
                      {award.location && ` - ${award.location}`}
                    </h5>
                    <br />
                  </li>
                </Fade>
              ))}
            </ul>
            {!showMore && data?.length > 6 && (
              <Button
                style={{ margin: 25 }}
                variant={theme.bsSecondaryVariant}
                onClick={() => setShowMore(true)}
              >
                Show more
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

Awards.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Awards;
