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
      <a href="/search">취약 검색(공격용)</a> |
      <a href="/search-safe">안전 검색(방어용)</a>
    </nav>
    <hr />
    ${body}
  </body>
  </html>
  `;
}

// 1) 홈
app.get('/', (req, res) => {
  res.send(layout('홈', `
    <h2>홈</h2>
    <p>Reflected XSS 공격/방어 시나리오 데모용 기본 웹사이트입니다.</p>
  `));
});

// 2) 공격 시나리오용 기본 페이지 (취약 검색)
app.get('/search', (req, res) => {
  const q = req.query.q || '';

  res.send(layout('취약 검색', `
    <h2>취약 검색 페이지 (공격 시나리오용)</h2>
    <form method="get" action="/search">
      <input type="text" name="q" value="${q}" placeholder="검색어 입력" />
      <button type="submit">검색</button>
    </form>

    <h3>검색 결과</h3>
    <p>검색어: ${q}</p>
    <!-- ⚠ 여기서 공격 담당이 XSS 설명/시나리오 넣어서 발표 -->
  `));
});

// 3) 방어 시나리오용 기본 페이지 (안전 검색)
app.get('/search-safe', (req, res) => {
  const q = req.query.q || '';

  res.send(layout('안전 검색', `
    <h2>안전 검색 페이지 (방어 시나리오용)</h2>
    <form method="get" action="/search-safe">
      <input type="text" name="q" value="${q}" placeholder="검색어 입력" />
      <button type="submit">검색</button>
    </form>

    <h3>검색 결과</h3>
    <p>검색어: ${q}</p>
    <!-- 🔒 여기서 방어 담당이 he.encode 같은 방어 코드/설명 추가 -->
  `));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
