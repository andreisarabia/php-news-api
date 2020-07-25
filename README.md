# PHP News API

This app provides a UI for the [News API](https://newsapi.org). The logic for fetching API data is found in `src/NewsApi.php`.

The routing is administered through the filesystem, i.e. requests to `/api/news.php` map to that folder and file. Requests are `POST`ed there and the script takes care of the rest.

The frontend is written in vanilla JS, using nifty ES6-and-beyond features like:

- Array destructuring
- Async/await control flows
- Arrow functions
- Functional logic (e.g. `.forEach` for arrays)

## API Auth Note

The API requires a key that you can get [here](https://newsapi.org/pricing). The `Config` class in `src` reads from `php.newsapi.ini` in the `config` folder; it expects a key named `newsApiKey` to have its value as the API key.

# TODO

- Sanitize parameters sent in requests
- Add logic for the `/everything` and `/sources` endpoints
- Add more options for the API (e.g. country, category, etc.)
- Add pagination to flip through the results
- Add CSP and other secure headers
