const questions = [
    {
        question: "Qual a profundidade da fossa das Marianas?",
        image: "imagens/fossa.webp", 
        answers: [
            { text: "A - 5.000m", correct: false },
            { text: "B - Mais de 10.000m", correct: true },
            { text: "C - 8.000m", correct: false },
            { text: "D - 1.000m", correct: false }
        ],
        explanation: "A Fossa das Marianas, localizada no Oceano Pacífico, é o ponto mais profundo dos oceanos, atingindo cerca de 10.984 metros de profundidade!"
    },
    
    {
        question: "Qual porcentagem da Terra é coberta por oceanos?",
        image: "imagens/porcentagem-agua.jpeg",
        answers: [
            { text: "A - 71%", correct: true },
            { text: "B - 61%", correct: false },
            { text: "C - 50%", correct: false },
            { text: "D - 80%", correct: false }
        ],
        explanation: "Aproximadamente 71% da superfície da Terra é coberta por oceanos, tornando nosso planeta predominantemente azul quando visto do espaço."
    },
    {
        question: "Os polvos são conhecidos por sua inteligência. Quantos corações um polvo possui?",
        image: "imagens/polvo-perguntas.jpeg",
        answers: [
            { text: "A - 1", correct: false },
            { text: "B - 2", correct: false },
            { text: "C - 3", correct: true },
            { text: "D - 4", correct: false }
        ],
        explanation: "Os polvos têm 3 corações! Dois deles bombeiam sangue para as guelras (onde respiram) e o terceiro bombeia sangue para o resto do corpo."
    },

    {
        question: "Qual é o maior animal que já viveu na Terra e habita os oceanos?",
        image: "imagens/maior-animal3-perguntas.png", 
        answers: [
            { text: "A - Tubarão Baleia", correct: false },
            { text: "B - Lula Colossal", correct: false },
            { text: "C - Baleia Azul", correct: true },
            { text: "D - Megalodon", correct: false }
        ],
        explanation: "A Baleia Azul pode chegar a 30 metros de comprimento e pesar até 180 toneladas. Ela é maior até mesmo do que os maiores dinossauros que já existiram!"
    },

     {
        question: "Qual ecossistema marinho tropical abriga cerca de 25% das espécies marinhas conhecidas, mesmo ocupando menos de 1% do fundo oceânico?",
        image: "imagens/corais-perguntas.png",
        answers: [
            { text: "A - Manguezais", correct: false },
            { text: "B - Recifes de coral", correct: true },
            { text: "C - Florestas de algas", correct: false },
            { text: "D - Mar aberto", correct: false }
        ],
        explanation: "Recifes de coral são ecossistemas marinhos tropicais formados por colônias de pequenos animais chamados pólipos de coral. Mesmo ocupando uma área muito pequena do oceano, eles abrigam cerca de 25% das espécies marinhas conhecidas."
    }
];


const questionTitle = document.querySelector(".app h1");
const questionElement = document.getElementById("question");
const imageElement = document.querySelector(".fossa");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("botao");


const explanationBox = document.createElement("div");
explanationBox.id = "explanation-box";
document.querySelector(".quiz").appendChild(explanationBox); 


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima pergunta";
    showQuestion();
}

function showQuestion() {
    resetState(); 
    
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    
    questionTitle.innerHTML = `Pergunta ${questionNo}`;
    questionElement.innerHTML = currentQuestion.question;
    
    if (currentQuestion.image) {
        imageElement.src = currentQuestion.image;
        imageElement.style.display = "block";
    } else {
        imageElement.style.display = "none";
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    explanationBox.style.display = "none"; 
    explanationBox.className = ""; 
    
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    const currentQuestion = questions[currentQuestionIndex];
    
    
    explanationBox.style.display = "block";
    
    if (isCorrect) {
        selectedBtn.style.backgroundColor = "#2ecc71"; 
        selectedBtn.style.color = "#000";
        score++;
        
        
        explanationBox.innerHTML = `<h3 style="color: #2ecc71;"> Resposta Certa!</h3><p>${currentQuestion.explanation}</p>`;
        explanationBox.classList.add("box-correct");
    } else {
        selectedBtn.style.backgroundColor = "#e74c3c"; 
        selectedBtn.style.color = "#fff";
        
       
        explanationBox.innerHTML = `<h3 style="color: #e74c3c;"> Resposta Errada!</h3><p>${currentQuestion.explanation}</p>`;
        explanationBox.classList.add("box-wrong");
    }
    
    
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "#2ecc71";
            button.style.color = "#000";
        }
        button.disabled = true; 
    });
    
    nextButton.style.display = "block"; 
}

function showScore() {
    resetState();
    questionTitle.innerHTML = "Resultado Final";
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas !! Continue praticando e não se esqueça, cuide da vida marinha, e coloque em pratica tudo que você aprendeu nesse site!! 🌊`;
    imageElement.style.display = "none"; 
    
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();