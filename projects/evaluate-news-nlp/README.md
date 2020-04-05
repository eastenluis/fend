# Front-end Development Project: Evaluate a news article with NLP

This is the source code for front-end development project, "Evaluate a news article with Natural Language Processing". This project consists two portions:

- Web Front-end: Accepts an article URL and display the analysis result in the page.
- Node.js Back-end: Serves as a web server returns the web front-end, and provides two text analysis endpoints: `/api/classify` and `/api/summarize`. It makes requests to Aylien Text APIs and responds
    results back to the client.

## How to start

- Install necessary packages with `npm install`
- Ensure environment variables `AYLIEN_APP_ID` and `AYLIEN_APP_KEY` exist. You may also set the variables in  a `.env` file.
- Run `npm run start` to start the back-end server.
- To access the front end,
  - If you are in the development environment: `npm run build-dev` and open `localhost:8080`
  - If you are in the production environment: `npm run build-prod` and open `localhost:8081`

## Aylien APIs

This project has used the following Aylien APIs:

- [Classification](https://docs.aylien.com/textapi/endpoints/#classification): This endpoint categorizes the articles, returning the language and category labels of a given article.
- [Summarization](https://docs.aylien.com/textapi/endpoints/#summarization): This endpoint drafts a five-sentence summarization of the given article.

## Service Worker

Service Worker is registered in production environment only. The detail may be found in `registerServiceWorker.js`.
