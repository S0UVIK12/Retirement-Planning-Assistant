// Toggle Sidebar Visibility
function showSidebar() {
    document.querySelector('.sidebar').classList.add('show');
  }
  
  function hideSidebar() {
    document.querySelector('.sidebar').classList.remove('show');
  }
  
  // Form Handling Logic (Retirement Assistant)
  const form = document.getElementById('financialForm');
  const output = document.getElementById('output');
  const loader = document.getElementById('loader');
  
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    output.innerHTML = "";
    loader.classList.remove('hidden');
  
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const currency = document.getElementById('currency').value;
    const retirementAge = document.getElementById('retirementAge').value;
    const monthlyExpectancy = document.getElementById('monthlyExpectancy').value;
    const currentMonthlyIncome = document.getElementById('currentMonthlyIncome').value;
    const expectedSalaryGrowth = document.getElementById('expectedSalaryGrowth').value;
    const currentInvestments = document.getElementById('currentInvestments').value;
  
    const prompt = `Generate a financial planning recommendation for ${name}, aged ${age}, earning ${currentMonthlyIncome}${currency} monthly. They expect a salary growth of ${expectedSalaryGrowth}%, aim to retire by ${retirementAge}, and have monthly expenses of ${monthlyExpectancy}${currency}. Current investments: ${currentInvestments}${currency}.`;
  
    const websocket = new WebSocket("wss://backend.buildpicoapps.com/ask_ai_streaming_v2");
  
    websocket.addEventListener("open", () => {
      websocket.send(
        JSON.stringify({
          appId: "improve-remain",
          prompt: prompt,
        })
      );
    });
  
    websocket.addEventListener("message", (event) => {
      loader.classList.add('hidden');
      output.innerText += event.data;
    });
  
    websocket.addEventListener("close", () => {
      loader.classList.add('hidden');
      output.innerHTML += "\n\nSession closed.";
    });
  
    websocket.addEventListener("error", () => {
      loader.classList.add('hidden');
      output.innerHTML = "<p class='text-red-500'>An unexpected error occurred. Please refresh the page.</p>";
    });
  });
  