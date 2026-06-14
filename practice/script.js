const recommendButton = document.querySelector("#recommend-button");

recommendButton.addEventListener("click", function() {
   const budget = document.querySelector("#budget").value;
   const days = document.querySelector("#days").value;
   const result = document.querySelector("#result");

   result.textContent = `예산 ${budget}원의로 ${days}일 여행을 추천합니다.`; 
});
