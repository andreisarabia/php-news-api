(() => {
  /**
   * @param {string} str
   * @returns {boolean}
   */
  const isAlphanumeric = str => /^\w+$/g.test(str);

  /**
   * @param {string} url
   * @returns {string}
   */
  const getDomainFromUrl = url => new URL(url).hostname;

  /**
   * @returns {HTMLParagraphElement}
   */
  const createParagraphElement = () => document.createElement('p');

  /**
   * @returns {'headlines' | 'everything' | 'sources'}
   */
  const getSpecifiedNewsType = () =>
    document.querySelector('select[name="news-type"]').value;

  /**
   * @returns {HTMLElement}
   */
  const getNewsGrid = () => document.querySelector('#news-grid');

  /**
   * @returns {HTMLElement}
   */
  const getSearchNotifEl = () => document.querySelector('#news-search-notif');

  /**
   * @param {HTMLElement} element
   */
  function removeChildElements(element) {
    while (element.firstChild) element.removeChild(element.lastChild);
  }

  /**
   * @param {string} src
   * @returns {HTMLImageElement}
   */
  function createImage(src) {
    const img = new Image();
    img.src = src;
    img.loading = 'lazy';
    return img;
  }

  /**
   * @param {string} className
   * @returns {HTMLDivElement}
   */
  function createDiv(className) {
    const div = document.createElement('div');
    if (className) div.className = className;
    return div;
  }

  /**
   * @param {string} href
   * @param {object} options properties of an anchor tag
   * @returns {HTMLAnchorElement}
   * @link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
   */
  function createAnchorElement(
    href,
    options = { target: '_blank', rel: 'noreferrer' }
  ) {
    const a = document.createElement('a');
    a.href = href;
    for (const key in options) a[key] = options[key];
    return a;
  }

  /**
   * @param {string} className
   * @returns {HTMLSpanElement}
   */
  function createSpanElement(className) {
    const span = document.createElement('span');
    if (className) span.className = className;
    return span;
  }

  /**
   * @param {(string | number)[][]} dataArr
   */
  function buildFormData(dataArr) {
    const formData = new FormData();
    dataArr.forEach(([key, val]) => formData.set(key, val));
    return formData;
  }

  function listenToSearch() {
    const searchForm = document.querySelector('form#search-news-form');

    searchForm.onsubmit = async e => {
      e.preventDefault();

      const searchInput = document.querySelector('input#search-news-topic');
      const query = searchInput.value;

      if (!query) await populateNewsGrid();
      else if (!isAlphanumeric(query)) searchInput.value = '';
      else await populateNewsGrid([['q', query]]);
    };
  }

  /**
   * @param {(string | number)[][]} bodyOptions
   * @returns {Promise<object>} array of results from the News API
   * @link https://newsapi.org/docs/endpoints
   */
  async function fetchNews(bodyOptions) {
    bodyOptions = [['newsType', getSpecifiedNewsType()], ...bodyOptions];

    const body = buildFormData(bodyOptions);
    const res = await fetch('/api/news.php', { method: 'POST', body });

    return res.json();
  }

  /**
   * @param {(string | number)[][]} params
   */
  async function populateNewsGrid(params = []) {
    const { articles } = await fetchNews(params);
    const newsGrid = getNewsGrid();
    const searchErrorEl = getSearchNotifEl();

    removeChildElements(newsGrid);

    if (articles.length === 0) {
      searchErrorEl.innerText = 'There are no results for your search term.';
      return;
    }

    searchErrorEl.innerText = '';

    articles.forEach(article => {
      const storyTitle = document.createElement('h3');
      const storyDescription = createParagraphElement();
      const wrapperDiv = createDiv('news-grid-box');
      const newsInfoDiv = createDiv('news-info');
      const linkWrapper = createAnchorElement(article.url);
      const subInfo = createSpanElement('subtitle');
      const img = createImage(article.urlToImage);

      storyTitle.innerText = article.title;
      storyDescription.innerText = article.description;
      subInfo.innerText = article.source.name || getDomainFromUrl(article.url);

      newsInfoDiv.appendChild(storyTitle);
      newsInfoDiv.appendChild(storyDescription);
      newsInfoDiv.appendChild(subInfo);
      linkWrapper.appendChild(img);
      linkWrapper.appendChild(newsInfoDiv);
      wrapperDiv.appendChild(linkWrapper);
      newsGrid.appendChild(wrapperDiv);
    });
  }

  async function start() {
    listenToSearch();

    await populateNewsGrid();
  }

  start();
})();
