const recommendButton = document.querySelector("#recommend-button");

recommendButton.addEventListener("click", function() {
   const budget = document.querySelector("#budget").value;
   const days = document.querySelector("#days").value;
   const companion = document.querySelector("#companion").value;
   const travelStyle = document.querySelector("#travel-style").value;
   const checkedInterests = document.querySelectorAll(
    'input[name="interest"]:checked'
   );

   const interests = Array.from(checkedInterests).map(function (checkbox) {
    return checkbox.value;
   });
   const result = document.querySelector("#result");

   let recommendedCity = "도쿄";
   let recommendedReson = "처음 일본 여행을 준비하는 여행자에게 다양한 선택지가 있기 때문입니다."

   if (interests.includes("nature")) {
    recommendedCity = "삿포로";
    recommendedReson = " 자연, 계절 풍경, 여유로운 여행을 즐기기에 좋기 떄문입니다.";
   } else if (interests.includes("food")) {
    recommendedCity = "후쿠오카";
    recommendedReson = "라멘, 야타이, 해산물 등 먹거리 중심 여행에 적합하기 때문입니다.";
   } else if (interests.includes("shopping")) {
    recommendedCity = "오사카";
    recommendedReson = "쇼핑, 맛집, 도심 관광을 함께 즐기기 좋기 때문입니다.";
   }

   if (budget === "") {
    result.textContent = "예산을 입력해주세요.";
    return;
   }

   if (interests.length === 0) {
    result.textContent = "관심사를 하나 이상 선택해주세요.";
    return;
   }

   result.innerHTML = 
    `추천 여행지: ${recommendedCity}<br>` +
    `추천 이유: ${recommendedReson}<br>` +
    `예산: ${budget}원<br>` +
    `여행 기간: ${days}일<br>` +
    `동행 유형: ${companion}<br>` +
    `여행 스타일: ${travelStyle}<br>` +
    `관심사: ${interests.join(", ")}`;
});
