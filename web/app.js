const express = require('express');
const app = express();
const PORT = 3000;

// 공통 레이아웃
function layout(title, body) {
  return `
  <!doctype html>
  <html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
  </head>
  <body>
    <h1>Reflected XSS 데모 사이트</h1>
    <nav>
      <a href="/">홈</a> |
      <a href="/search">검색 페이지</a>
    </nav>
    <hr />
    ${body}
  </body>
  </html>
  `;
}

// 홈
app.get('/', (req, res) => {
  res.send(layout('홈', `
    <h2>홈</h2>
    <p>Reflected XSS 공격·방어 시나리오 데모용 기본 웹사이트입니다.</p>
    <p><a href="/search">검색 페이지로 이동</a></p>
  `));
});

// 검색(공격 시나리오 대상)
app.get('/search', (req, res) => {
  const q = req.query.q || '';

  res.send(layout('검색', `
    <h2>검색 페이지</h2>
    <form method="get" action="/search">
      <input type="text" name="q" value="${q}" placeholder="검색어 입력" />
      <button type="submit">검색</button>
    </form>

    <h3>검색 결과</h3>
    <p>검색어: ${q}</p>
    <!-- 여기서 공격/방어 담당이 XSS 공격·방어 시나리오 설명 -->
  `));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
