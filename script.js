let questions = [];
let currentIndex = 0;

window.onload = async function() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        loadQuestion(currentIndex);
    } catch (error) {
        console.error("加载真题数据失败:", error);
        document.getElementById('q-title').innerText = "数据加载失败，请检查数据文件。";
    }
}

function loadQuestion(index) {
    if (questions.length === 0) return;
    
    const q = questions[index];
    document.getElementById('q-title').innerText = `Q51 专项提升 - 第 ${index + 1} 题：${q.title}`;
    document.getElementById('text-before').innerText = q.context_before;
    document.getElementById('text-after').innerText = q.context_after;
    
    document.getElementById('hint-panel').style.display = 'none';
    document.getElementById('answer-panel').style.display = 'none';
    
    // 新增：切换题目时，清空输入框
    document.getElementById('user-ans').value = "";
}

function showHint() {
    const panel = document.getElementById('hint-panel');
    panel.innerText = questions[currentIndex].hint;
    panel.style.display = 'block';
}

function showAnswer() {
    const panel = document.getElementById('answer-panel');
    panel.innerText = `参考答案： ${questions[currentIndex].answer}`;
    panel.style.display = 'block';
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % questions.length;
    loadQuestion(currentIndex);
}