import React from 'react';
import { Message } from 'semantic-ui-react'

const NotFoundPage = () => (
    <Message negative>
      <Message.Header>Route does not exist.</Message.Header>
    </Message>
  )

export default NotFoundPage;
