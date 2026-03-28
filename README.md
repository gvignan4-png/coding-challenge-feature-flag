# Feature Flag Engine

## Setup
npm install

## Run app
npm start

## Run tests
npm test

## API Examples

Create feature:
POST /features
{
  "name": "new-dashboard",
  "defaultEnabled": false
}

Evaluate:
GET /features/new-dashboard/evaluate?userId=1&groupId=2

## AI Usage Disclosure
Used ChatGPT for structuring and guidance. Implementation understood and written by me.
