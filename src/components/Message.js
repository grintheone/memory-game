import React from 'react';

export default function Message(props) {
    const [message, setMessage] = React.useState("Game Over")
    
    function randomize(items) {
        return items[Math.floor(Math.random()*items.length)];
    }
    const congratulations = [
        "Congratulations on your well-deserved success.",
        "Heartfelt congratulations to you.",
        "Warmest congratulations on your achievement.",
        "Congratulations and best wishes for your next adventure!",
        "So pleased to see you accomplishing great things."
    ]

    React.useEffect(() => {
        console.log(props.score)
        if (props.score === 12) {
            setMessage(randomize(congratulations))
        } else {
            setMessage("Game Over")
        }
    }, [props.score])


    return message;
}