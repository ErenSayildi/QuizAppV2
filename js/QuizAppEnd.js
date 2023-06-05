const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5



// En Son Kazanılan Puanı Ekrana Yazdırma
finalScore.innerText = mostRecentScore;

// Inputun Valuesi Değişmez ise Butonu Kilitle
username.addEventListener('keyup', () => 
{
    saveScoreBtn.disabled = !username.value
})

// Save Butonuna Tıklandığında
saveHighScore = e => 
{
    e.preventDefault()

    // Inputa Girilen Değeri ve LocalStoragedaki değişkene Atanan Score Sayısını Al
    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    // Karşılaştırma Yapıp Yüksek Puandan Düşük Puana Doğru Sırala
    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    // LocalStorage a Skorları ve İsimleri Ekle
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('../index.html')

    
}