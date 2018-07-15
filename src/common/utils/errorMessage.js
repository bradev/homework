
const messagesMap = {
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  500: 'Internal Server Error'
}

const msgByCode = code => {
  return messagesMap[code] || 'Something went wrong';
}

export default msgByCode;
