"use client";

import { eventNames } from "process";
import { useState } from "react";

export default function Home() {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("2");

  return (
    <main>
      <h1>TABIT</h1>
      <p>나에게 맞는 일본 여행지를 찾아보세요.</p>

      <label htmlFor="budget">예산(만원)</label>
      <input 
        id="budget"
        type="number" 
        placeholder="예: 100" 
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
        />

      <label htmlFor="days">여행 기간</label>
      <select 
        id="days"
        value={days}
        onChange={(event) => setDays(event.target.value)}
        >
        <option value="2">2일</option>
        <option value="3">3일</option>
        <option value="4">4일</option>
      </select>

      <p>입력한 예산: {budget}만 원</p>
      <p>선택한 여행 기간: {days}일</p>

      <button type="button">여행지 추천</button>
    </main>
  );
}