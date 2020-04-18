import React from 'react';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import alarmImage from '../../img/alarm.svg';

import styled from 'styled-components';
import {Link} from 'react-router-dom';

const CardImage = styled(Image)`
  width: 100%;
  height: 230px;
  object-fit: cover;
`;
const CardDescription = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const TestCard = ({testInfo}) => {

  return (
    <Row className="shadow mx-0 mb-4 rounded">
      <Col md={4} className="px-0">
        <CardImage className="rounded-md-left rounded-top" src="https://source.unsplash.com/random"/>
      </Col>
      <Col md={8} className="px-3 py-4 d-flex flex-column justify-content-between">
        <div>
          <h4>{testInfo.title}</h4>
          <CardDescription>{testInfo.description}</CardDescription>
        </div>
        <div className="d-flex justify-content-between">
          <Button as={Link} to={"/test/"+testInfo.id} variant="primary">View</Button>
          <p className="align-self-end m-0">
            <Image className="pb-1 mr-1" src={alarmImage}/>
            <span>{testInfo.time_interval} min</span>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default TestCard;
