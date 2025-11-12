const express = require('express');
const router = express.Router();

// 레이아웃
function layout(title, body) {
  return `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <h1>Reflected XSS Simulation</h1>
    <hr />
    ${body}
  </body>
  </html>
  `;
}

router.get('/', (req, res) => {
  const inputSearch = req.query.inputSearch || '';

  res.send(layout('검색', `
    <div class="card">
      <h2>검색 페이지</h2>
      <form method="get" action="/">
        <input type="text" name="inputSearch" value="${inputSearch}" placeholder="검색어 입력" />
        <button type="submit">검색</button>
      </form>

      <h3>검색어 미리보기</h3>
      <p class="preview">${inputSearch}</p>
    </div>
  `));
});

module.exports = router;