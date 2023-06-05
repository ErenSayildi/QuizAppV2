const question = document.querySelector('#Question');
const choices = Array.from(document.querySelectorAll('.ChoiceText'));
const progressText = document.querySelector('#ProgressText');
const scoreText = document.querySelector('#Score');
const progressBarFull = document.querySelector('#ProgressBarFull');
//Time
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    
    {
        question:"Yazılımın kullanılabilirliği aşağıdaki hangi faktörlere bağlıdır?",
        choice1:`Çalışma hızı, bellek kullanımı, depolama alanı.`,
        choice2:`İşletim sistemi, programlama dili, veritabanı.`,
        choice3:`Donanım özellikleri, işletim sistemi, programlama dili.`,
        choice4:`Arayüz tasarımı, kullanıcı deneyimi, işlevsellik.`,
        answer: 4,
    },
    
    {
        question:`Yazılım nedir?`,
        choice1:`Sadece bilgisayar programlarından oluşan bir dosya`,
        choice2:`Bilgisayarda çalışan her türlü uygulama ve program`,
        choice3:`Bilgisayar donanımını kontrol eden bir sistem`,
        choice4:`Bilgisayara talimat veren yazılı komutlar`,
        answer: 2,
    },
    
    {
        question:`Yazılım güncelleştirmeleri aşağıdakilerden hangisi için önemlidir?`,
        choice1:`Hata düzeltmeleri.`,
        choice2:`Performans iyileştirmeleri.`,
        choice3:`Güvenlik güncellemeleri.`,
        choice4:`Hepsi`,
        answer: 4,
    },
    
    {
        question:`Kodlama sürecinde hangi aşama hataları tespit edilir ve düzeltilir?`,
        choice1:`Test aşaması.`,
        choice2:`Tasarım aşaması`,
        choice3:`Yorumlama aşaması.`,
        choice4:`Derleme aşaması.`,
        answer: 1,
    },
    
    {
        question:`Windows işletim sisteminin ilk sürümü olan Windows 1.0 hangi yılda piyasaya sürülmüştür?`,
        choice1:`1996`,
        choice2:`1985`,
        choice3:`1925`,
        choice4:`1981`,
        answer: 2,
    },
    
    {
        question:`Linux işletim sisteminin ilk çekirdek sürümü hangi tarihte yayınlanmıştır?`,
        choice1:`1995`,
        choice2:`1998`,
        choice3:`1991`,
        choice4:`2001`,
        answer: 3,
    },
    
    {
        question:`Java programlama dilinin ilk sürümü hangi tarihte çıkmıştır?`,
        choice1:`2000`,
        choice2:`1992`,
        choice3:`1988`,
        choice4:`1995`,
        answer: 4,
    },
    
    {
        question:`İlk mobil işletim sistemi olan Android'in ilk sürümü hangi yılda piyasaya sürülmüştür?`,
        choice1:`2007`,
        choice2:`2000`,
        choice3:`1997`,
        choice4:`2011`,
        answer: 1,
    },
    
    {
        question:`İlk tarayıcı tabanlı JavaScript motoru hangi yıl geliştirilmiştir?`,
        choice1:`1995`,
        choice2:`1993`,
        choice3:`1997`,
        choice4:`1999`,
        answer: 1,
    },
    
    {
        question:`Yazılım mimarisi nedir?`,
        choice1:`Yazılımın nasıl geliştirildiğini planlama sürecidir.`,
        choice2:`Yazılımın fiziksel bileşenlerini tasarlama sürecidir.`,
        choice3:`Yazılımın yapısını, bileşenlerini ve ilişkilerini tanımlama sürecidir.`,
        choice4:`Yazılımın test edildiği süreçlerin bütünüdür.`,
        answer: 3,
    },
    
    {
        question:`Monolitik mimari nedir?`,
        choice1:`Yazılımı bağımsız bileşenlere ayırma yaklaşımıdır.`,
        choice2:`Yazılımın tüm bileşenlerinin tek bir dosya veya modülde birleştirildiği mimaridir.`,
        choice3:`Yazılımı işlevsel bölgelere ayırma yaklaşımıdır.`,
        choice4:`Yazılımı farklı sistemlerle etkileşim halinde olan bileşenlere ayırma yaklaşımıdır.`,
        answer: 2,
    },
    
    {
        question:`Katmanlı mimari nedir ?`,
        choice1:`Yazılımı bağımsız bileşenlere ayırma yaklaşımıdır.`,
        choice2:`Yazılımın tüm bileşenlerinin tek bir dosya veya modülde birleştirildiği mimaridir.`,
        choice3:`Yazılımı işlevsel bölgelere ayırma yaklaşımıdır.`,
        choice4:`Yazılımın mantıksal katmanlara ayrıldığı mimaridir.`,
        answer: 4,
    },
    
    {
        question:"JavaScript hangi tarayıcılar tarafından desteklenir?",
        choice1:`Tüm modern tarayıcılar`,
        choice2:`Sadece Microsoft Edge`,
        choice3:`Sadece Mozilla Firefox`,
        choice4:`Sadece Google Chrome`,
        answer: 1,
    },

    {
        question:"JavaScript'te hangi fonksiyon ile bir stringin uzunluğu alınır?",
        choice1:`size()`,
        choice2:`count()`,
        choice3:`sizeOf()`,
        choice4:`length()`,
        answer: 4,
    },

    {
        question:"JavaScript'te hangi metod ile bir diziye yeni bir eleman eklenir?",
        choice1:` add()`,
        choice2:`insert()`,
        choice3:`push()`,
        choice4:`append()`,
        answer: 3,
    },
];

let timeValue =  15;
const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => 
{  
    startTimer(15);
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => 
{
    clearInterval(counter);
    startTimer(timeValue);
    // Mevcut Sorular Sıfır İse Veya Soru Sayacı Max Sorudan Büyük İse En Son Skoru LocalStorage'a Yolla Quizi Bitir
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) 
    {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('../html/QuizAppEnd.html');
    } 

    // Soru Sayacını Arttır Sayaç Arttıkça Arayüzdeki Göstergeleride Güncelle
    questionCounter++
    progressText.innerText = `Soru ${questionCounter} of ${MAX_QUESTIONS}`
    // Soru Sayacı Arttıkça Progresbarın Yüzdesini Arttır
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //Soruları Rastgele Kullanıcıya Gösterme
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => 
    {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

    //console.log(questions[questionsIndex].answer);

}
//Kullanıcının Seçeneklerden Birini Seçtiğinde Seçtiği Seçeneğin Doğruluğunu Kontrol Eder
choices.forEach(choice => 
    {
    choice.addEventListener('click', e => 
    {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => 
        {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})


function startTimer(time)
{
    counter = setInterval(timer, 1000);
    timeText.textContent = "Time Left";
    function timer()
    {
        timeCount.textContent = time;
        time--;
// Sayaç Rakamlara Geldiğinde Başına "0" Ekle
        if(time < 9)
        {
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }

// Süre Bittiğinde Sayacı Durdur/Doğru Cevabı Göster ve Yeni Soruya Geç
        if(time < 0)
        {
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 

            const correctChoice = document.querySelector(`.choice-container .ChoiceText[data-number="${currentQuestion.answer}"]`);
            correctChoice.parentElement.classList.add('correct');

            setTimeout(() => 
            {
                correctChoice.parentElement.classList.remove('correct');
                getNewQuestion();
            }, 1000);
        }   
    }
}

//Skor Arttırma
incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()

