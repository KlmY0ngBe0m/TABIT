"use client";

import { eventNames } from "process";
import { use, useState } from "react";

export default function Home() {
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("2");
  const [companion,setCompanion] = useState("solo");
  const [travelStyle,SetTravelStyle] = useState("relaxed");

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

      <label htmlFor="companion">동행 유형</label>
      <select
        id = "companion"
        value={companion}
        onChange={(event) => setCompanion(event.target.value)}
      >
        <option value="solo">혼자</option>
        <option value="friend">친구</option>
        <option value="couple">연인</option>
        <option value="family">가족</option>
      </select>

    <label htmlFor="travel-style">여행 스타일</label>
    <select
      id = "travel-style"
      value={travelStyle}
      onChange={(event) => SetTravelStyle(event.target.value)}
    >
      <option value="relaxed">여유롭게</option>
      <option value="balanced">보통</option>
      <option value="packed">알차게</option>
    </select>

    <p>동행 유형: {companion}</p>
    <p>여행 스타일: {travelStyle}</p>
      <button type="button">여행지 추천</button>
    </main>
  );
}