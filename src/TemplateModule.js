import React, { useEffect, useState } from 'react';
import { Container, Form, Input, Grid, Card } from 'semantic-ui-react';

import { useSubstrate } from './substrate-lib';
import { TxButton } from './substrate-lib/components';

export default function Main (props) {
  const { api } = useSubstrate();
  const { accountPair, accountAddress } = props;

  // The transaction submission status
  const [status, setStatus] = useState('');
  const [status1, setStatus1] = useState('');

  // The currently stored value
  const [currentValue, setCurrentValue] = useState(0);
  const [currentId, setCurrentId] = useState(0);
  const [currentTitle, setCurrentTitle] = useState();
  const [formValue, setFormValue] = useState(0);
  const [formTitle, setFormTitle] = useState();

  useEffect(() => {
    let unsubscribe;
    api.query.templateModule.ebookItem(accountAddress, (newValue) => {
      setCurrentValue(newValue.ebook_value.toHuman());
      setCurrentTitle(newValue.ebook_title.toHuman());
      setCurrentId(newValue.ebook_id.toHuman());
      setStatus('');
      setStatus1('');
    }).then(unsub => {
      unsubscribe = unsub;
    })
      .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [accountAddress, api.query.templateModule]);

  return (
    <Container>
      <h1>Template Module : Hackathon Challenge - Frame Development</h1>
      <p><b> Storing a custom structure : </b> </p>
    <Grid stackable columns='equal'>
    <Grid.Column>
      <Card centered>
      <Card.Content>
      <div style={{ overflowWrap: 'break-word' }}>
      <p><b> Ebook-Id : </b> {currentId} </p>
      <p><b> Ebook-Title : </b> {currentTitle} </p>
      <p><b> Ebook-Value : </b> {currentValue} </p>
      </div>
      </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column>
      <Card centered>
        <Card.Content textAlign='center'>
      <Form>
        <Form.Field required>
          <Input
            label='Set Ebook Value'
            state='currentValue'
            type='number'
	    size='mini'
            onChange={(_, { value }) => setFormValue(value)}
          />
        </Form.Field>
        <Form.Field required>
          <Input
            label='Set Ebook Title'
            state='currentTitle'
	    size='mini'
            onChange={(_, { value }) => setFormTitle(value)}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Donate E-book'
            type='SIGNED-TX'
            setStatus={setStatus}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'donateBook',
	      inputParams: [formValue, formTitle],
	      paramFields: [true, true]
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
      </Card.Content>
      </Card>
    </Grid.Column>
    <Grid.Column>
      <Card centered>
        <Card.Content textAlign='center'>
      <Form>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            accountPair={accountPair}
            label='Revoke E-book'
            type='SIGNED-TX'
            setStatus={setStatus1}
            attrs={{
              palletRpc: 'templateModule',
              callable: 'takeBookBack',
	      inputParams: [],
	      paramFields: []
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status1}</div>
      </Form>
      </Card.Content>
      </Card>
    </Grid.Column>
    </Grid>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
      <p> &nbsp; </p>
    </Container>
  );
}