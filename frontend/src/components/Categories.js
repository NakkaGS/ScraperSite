import React from 'react'

//Boostrap Components
import { Row, Col, Card, ListGroup } from 'react-bootstrap'

function Categories() {
  return (
    <div>
        <Card className='mt-2 mb-3 ms-5' bg='light' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Categories</Card.Title>

            </Card.Body>
            <ListGroup bg='light' className="list-group-flush">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>

        </Card>
    </div>
  )
}

export default Categories