import React, {useState, useEffect} from 'react'
import Card from './components/Card'
import Message from './components/Message'

function App() {
  const [heroes, setHeroes] = useState([
    {name: "Arc Warden", image: "https://i.pinimg.com/564x/97/fe/05/97fe05c0e88284f75108287f3734b17c.jpg", clicked: false},
    {name: "Legion Commander", image: "https://i.pinimg.com/564x/73/5a/d1/735ad1828f3f06674827d80dd5341137.jpg", clicked: false},
    {name: "Invoker", image: "https://i.pinimg.com/564x/03/ab/1e/03ab1e662eb93a6707dc2e269b2bc6db.jpg", clicked: false},
    {name: "Terrorblade", image: "https://i.pinimg.com/564x/63/20/6e/63206e7dca28008bccde3f2d2a309348.jpg", clicked: false},
    {name: "Shadow Fiend", image: "https://i.pinimg.com/564x/ec/fc/2c/ecfc2c0db86afa7af6fd9f5b85535889.jpg", clicked: false},
    {name: "Queen of Pain", image: "https://i.pinimg.com/564x/3f/f7/f9/3ff7f9df8cac8d90edbb7ffa856fb3a9.jpg", clicked: false},
    {name: "Earth Spirit", image: "https://i.pinimg.com/564x/e3/5a/2b/e35a2b137a31ebac164675d0385b74a2.jpg", clicked: false},
    {name: "Zeus", image: "https://i.pinimg.com/564x/9f/14/53/9f145375e46c2923672672222bc1a74b.jpg", clicked: false},
    {name: "Sven", image: "https://i.pinimg.com/564x/6c/d0/ec/6cd0ecfe2c558b3a94f77fc98c35fe12.jpg", clicked: false},
    {name: "Lina", image: "https://i.pinimg.com/564x/84/a1/f6/84a1f6e22231dcdb839353295d0a8c1a.jpg", clicked: false},
    {name: "Morphling", image: "https://i.pinimg.com/564x/3e/1e/fd/3e1efd73374c54b7e7eb77e91592c8f7.jpg", clicked: false},
    {name: "Phantom Assassin", image: "https://i.pinimg.com/564x/38/38/c9/3838c9206c9fae60608636ad610204cc.jpg", clicked: false},
  ])

  const [nextGame, setNextGame] = useState(3);
  const [visibility, setVisibility] = useState({
    cards: 'show',
    message: 'hide'
  });

  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  
  const [cards, setCards] = useState(null)
  
  const shuffleCards = async (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const index = Math.floor(Math.random() * (i + 1))
      const temp = array[i];
      array[i] = array[index];
      array[index] = temp;
    }
  }  

  // Update counter and heroes array
  const hasBeenClicked = (card) => {
    heroes.forEach(hero => {
      if (card === hero.name && hero.clicked !== true) {
        // Update score 
        setScore(prevScore => prevScore + 1)
        
        // Update hero array
        setHeroes(prevState => {
          return prevState.map(hero => {
            if (card === hero.name) {
              return {
                ...hero, clicked: true
              }
            } else {
              return hero;
            }
          })
        })
      } else if (card === hero.name && hero.clicked === true) {
        // Update score 
        setScore(0)

        setVisibility(() => {
          return ({
            cards: "hide", 
            message: "show"
          })
        })

        const interval = setInterval(() => {
          
          setNextGame((oldValue) => {
            if (oldValue === 1) {
              clearInterval(interval)
              setVisibility(() => {
                return ({
                  cards: "show",
                  message: "hide"
                })
              })
              return 3
            }
            return oldValue - 1;
          })
        }, 1000)


        // Update hero array
        setHeroes(prevState => {
          return prevState.map(hero => {
            return {
              ...hero, clicked: false
            }
          })
        })

      } 
    })
  }

  useEffect(() => {
    const cards = []
    for (let i = 0; i < heroes.length; i++) {
      cards.push(<Card key={i} name={heroes[i].name} image={heroes[i].image} hasBeenClicked={() => hasBeenClicked(heroes[i].name)} />)
    }
    shuffleCards(cards)
    setCards(cards)
  }, [heroes])


// Update the high score and shuffle cards
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score)
    }
    
    if (cards) {
      shuffleCards(cards)
    }
  }, [score])

  useEffect(() => {
    if (score === 12 && visibility.cards !== "hide") {

      setVisibility(() => {
        return ({
          cards: "hide", 
          message: "show"
        })
      })

      const interval = setInterval(() => {
          
        setNextGame((oldValue) => {
          if (oldValue === 1) {
            clearInterval(interval)
            setVisibility(() => {
              return ({
                cards: "show",
                message: "hide"
              })
            })
            return 3
          }
          return oldValue - 1;
        })
      }, 1000)

      setTimeout(() => {
        setScore(0)
      }, 3000)
    }
  }, [score])

  return (
    <div className="App">
      <div className="top">
        <div className="title">
          <h1>Dota 2 Memory Game</h1>
          <p>Get points by clicking on a card but don't click on any more than once!</p>
        </div>
        <div className="score">
          <p>Score: {score}</p>
          <p>Best score: {bestScore}</p>
        </div>
      </div>
      <div className={`card-container ${visibility.cards}`}>
        {cards}
      </div>
      <div className={`message ${visibility.message}`}>
        <Message score={score} visibility={visibility.cards} />
        <div>Next game will begin in {nextGame}...</div>
      </div>
    </div>
  );
}

export default App;
