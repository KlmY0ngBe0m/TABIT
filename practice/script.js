const recommendButton = document.querySelector("#recommend-button");

recommendButton.addEventListener("click", function() {
   const budget = document.querySelector("#budget").value;
   const days = document.querySelector("#days").value;

   const companionSelect = document.querySelector("#companion");
   const travelStyleSelect = document.querySelector("#travel-style");

   const companion = companionSelect.options[companionSelect.selectedIndex].text;

   const travelStyle = travelStyleSelect.options[travelStyleSelect.selectedIndex].text;

   const checkedInterests = document.querySelectorAll(
    'input[name="interest"]:checked'
   );

   const interests = Array.from(checkedInterests).map(function (checkbox) {
    return checkbox.parentElement.textContent.trim();
   });
   const result = document.querySelector("#result");

   let recommendedCity = "도쿄";
   let recommendedReson = "처음 일본 여행을 준비하는 여행자에게 다양한 선택지가 있기 때문입니다."
   let estimatedBudget = "약 80만 원";
   let samplePlan = "1일차: 도심 관광/ 2일차: 쇼핑과 맛집 탐방";

   if (interests.includes("자연")) {
    recommendedCity = "삿포로";
    recommendedReson = " 자연, 계절 풍경, 여유로운 여행을 즐기기에 좋기 떄문입니다.";
    estimatedBudget = "약 90만원";
    samplePlan = "1일차: 삿포로 시내 관광 / 2일차: 오타루 당일치기 / 3일차: 자연 명소 방문";
   } else if (interests.includes("맛집")) {
    recommendedCity = "후쿠오카";
    recommendedReson = "라멘, 야타이, 해산물 등 먹거리 중심 여행에 적합하기 때문입니다.";
    estimatedBudget = "약 75만원";
    samplePlan = "1일차: 하카타  도착과 라멘 거리 / 2일차: 다자이후와 야타이 체험 / 3일차: 쇼핑";
   } else if (interests.includes("쇼핑")) {
    recommendedCity = "오사카";
    recommendedReson = "쇼핑, 맛집, 도심 관광을 함께 즐기기 좋기 때문입니다.";
    estimatedBudget = "약 85만원";
    samplePlan = "1일차: 난바와 도톤보리 / 2일차: 우메다 쇼핑 / 3일차: 교토 당일치기";
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
    `예상 예산: ${estimatedBudget}<br>` +
    `간단 일정: ${samplePlan}<br>` +
    `예산: ${budget}원<br>` +
    `여행 기간: ${days}일<br>` +
    `동행 유형: ${companion}<br>` +
    `여행 스타일: ${travelStyle}<br>` +
    `관심사: ${interests.join(", ")}`;
});
