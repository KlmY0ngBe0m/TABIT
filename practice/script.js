function getSelectedText(selectId) {
    const selectElement = document.querySelector(selectId);
    return selectElement.options[selectElement.selectedIndex].text;
}

function getCheckedInterests() {
    const checkedInterests = document.querySelectorAll(
        'input[name="interest"]:checked'
    );

    return Array.from(checkedInterests).map(function (checkbox) {
        return checkbox.parentElement.textContent.trim();
    });
}

function recommendDestination(interests) {
    
   let recommendedCity = "도쿄";
   let recommendationReason = "처음 일본 여행을 준비하는 여행자에게 다양한 선택지가 있기 때문입니다.";
   let estimatedBudget = "약 80만 원";
   let samplePlan = [
     "1일차: 도쿄 도착과 시부야 관광", 
     "2일차: 아사쿠사와 스카이트리",
     "3일차: 쇼핑과 맛집 탐방"
   ];

   if (interests.includes("자연")) {
    recommendedCity = "삿포로";
    recommendationReason = "자연, 계절 풍경, 여유로운 여행을 즐기기에 좋기 때문입니다.";
    estimatedBudget = "약 90만 원";
    samplePlan = [
        "1일차: 삿포로 시내 관광", 
        "2일차: 오타루 당일치기",
        "3일차: 자연 명소 방문"
    ];
   } else if (interests.includes("맛집")) {
    recommendedCity = "후쿠오카";
    recommendationReason = "라멘, 야타이, 해산물 등 먹거리 중심 여행에 적합하기 때문입니다.";
    estimatedBudget = "약 75만 원";
    samplePlan = [
    "1일차: 하카타 도착과 라멘 거리",
     "2일차: 다자이후와 야타이 체험",
     "3일차: 쇼핑"]
    ;
   } else if (interests.includes("쇼핑")) {
    recommendedCity = "오사카";
    recommendationReason = "쇼핑, 맛집, 도심 관광을 함께 즐기기 좋기 때문입니다.";
    estimatedBudget = "약 85만 원";
    samplePlan = [
        "1일차: 난바와 도톤보리",
        "2일차: 우메다 쇼핑", 
        "3일차: 교토 당일치기"
    ];
   }

   return {
    recommendedCity,
    recommendationReason,
    estimatedBudget,
    samplePlan,
   };
}

const recommendButton = document.querySelector("#recommend-button");

recommendButton.addEventListener("click", function() {
   const budget = document.querySelector("#budget").value;
   const days = Number(document.querySelector("#days").value);

   const companion = getSelectedText("#companion");
   const travelStyle = getSelectedText("#travel-style");
  
   const interests = getCheckedInterests();
  
   const result = document.querySelector("#result");


   if (budget === "") {
    result.textContent = "예산을 입력해주세요.";
    return;
   }

   if (Number(budget) < 30) {
    result.textContent = "예산은 최소 30만 원 이상으로 입력해주세요.";
    return;
   }

   if (interests.length === 0) {
    result.textContent = "관심사를 하나 이상 선택해주세요.";
    return;
   }

    const recommendation = recommendDestination(interests);
    const planByDays = recommendation.samplePlan.slice(0,days).join("<br>");

    result.innerHTML = 
    `추천 여행지: ${recommendation.recommendedCity}<br>` +
    `추천 이유: ${recommendation.recommendationReason}<br>` +
    `예상 예산: ${recommendation.estimatedBudget}<br>` +
    `간단 일정:<br>${planByDays}<br>` +
    `예산: ${budget}만 원<br>` +
    `여행 기간: ${days}일<br>` +
    `동행 유형: ${companion}<br>` +
    `여행 스타일: ${travelStyle}<br>` +
    `관심사: ${interests.join(", ")}`;
});
