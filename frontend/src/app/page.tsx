export default function Home() {
  return (
    <main>
      <h1>TABIT</h1>
      <p>나에게 맞는 일본 여행지를 찾아보세요.</p>

      <label htmlFor="budget">예산(만원)</label>
      <input id="budget" type="number" placeholder="예: 100" />

      <label htmlFor="days">여행 기간</label>
      <select id="days">
        <option value="2">2일</option>
        <option value="3">3일</option>
        <option value="4">4일</option>
      </select>

      <button type="button">여행지 추천</button>
    </main>
  );
}