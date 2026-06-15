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

   if (budget === "") {
    result.textContent = "예산을 입력해주세요.";
    return;
   }

   if (interests.length === 0) {
    result.textContent = "관심사를 하나 이상 선택해주세요.";
    return;
   }

   result.textContent = 
    `예산 ${budget}원으로 ${days}일 동안 ${companion} 유형과 ${travelStyle} 스타일에 맞는 여행을 추천합니다.
    관심사는 ${interests.join(", ")}입니다.`; 
});
