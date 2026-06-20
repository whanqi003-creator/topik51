let questions = [];
let currentIndex = 0;

window.onload = async function() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        
        // ✨ 新增：洗牌算法（Fisher-Yates Shuffle），自动将题库彻底乱序
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        
        loadQuestion(currentIndex);
    } catch (error) {
        console.error("加载真题数据失败:", error);
        document.getElementById('q-title').innerText = "数据加载失败，请检查数据文件。";
    }
}

function loadQuestion(index) {
    if (questions.length === 0) return;
    
    const q = questions[index];
    // 💡 这里去掉了死板的“第几题”，改成显示当前刷题的进度，更有刷题成就感
    document.getElementById('q-title').innerText = `${q.title} 专项提升（当前第 ${index + 1}/${questions.length} 道）`;
    document.getElementById('text-content').innerText = q.context;
    
    document.getElementById('hint-panel').style.display = 'none';
    document.getElementById('answer-panel').style.display = 'none';
    
    // 清空两个输入框
    document.getElementById('user-ans-a').value = "";
    document.getElementById('user-ans-b').value = "";
}

function showHint() {
    const panel = document.getElementById('hint-panel');
    panel.innerText = questions[currentIndex].hint;
    panel.style.display = 'block';
}

function showAnswer() {
    const panel = document.getElementById('answer-panel');
    panel.innerText = `【官方参考答案】\n${questions[currentIndex].answer}`;
    panel.style.display = 'block';
}

function nextQuestion() {
    currentIndex = (currentIndex + 1) % questions.length;
    loadQuestion(currentIndex);
}