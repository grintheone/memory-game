import React, {useEffect} from 'react'

function Card(props) {
    const isMounted = React.useRef(true)

    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false;
        }
    })

    return (
        <div onClick={() => props.hasBeenClicked()} className="card-body">
            <div className="card-image">
                <img src={props.image} alt="" />
            </div>
            <div className="card-name">
                {props.name}
            </div>
        </div>
    )
}

export default Card