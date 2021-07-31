# Judiths FE Challenge

## Notes

### Loading of messages

The API documentation promised to return the messages in reverse chronological order.
It returned them in chronological order instead.
Therefore i decided to load all chat messages at start since there was no documented way of knowing what the last X messages were.

If this was a project where I had influence on the backend, e.g. discussing the API with the backend engineer before implementation i would make the following request:

- **'order=ASC|DESC'**, add parameter for order to be able to specify which order i want
- **before=TIMESTAMP** add a parameter that does the opposite of since

with these 2 parameters i would be able to load the last X messages at the start and then have a 'Show more' button to load the X messages before the earliest loaded message.

In the long run I would request an implementation with websockets to avoid polling of the messages.

## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To provide an API key and your user name please create a `.env` file with the following content:

```
REACT_APP_API_TOKEN=[API_TOKEN]
REACT_APP_USERNAME=[YOUR_NAME]
```

Alternatively you can run the following scripts prefixed with the environment variables, e.g.

```
REACT_APP_API_TOKEN=[API_TOKEN] yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
