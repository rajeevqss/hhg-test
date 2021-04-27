import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router';

// page which has a counter with 2 buttons:
// 1. To increase the counter +1 on click
// 2. To reset the counter to 0

const Counter: React.FC<RouteComponentProps> = ({history}) => {
    const [count, setCount] = useState(0);
    const increaseCount = () =>{
        setCount(prevCount => prevCount + 1);
    }
    return (
            <div className="container">
                <br />
                <h4 className="text-center">Counter Page</h4>
                <br />
                <div className="col-12 text-center">
                    <h5>
                        Counter Value : { count|| 0 }
                    </h5>
                    <div>
                        <button className="btn btn-primary mr-1" onClick={ () => increaseCount() }> Increase </button>
                        <button className="btn btn-danger" onClick={ () => setCount(0) } > Reset</button>
                    </div>

                    <button className="btn btn-secondary  mt-5" onClick={() => history.push("/home") }>Go Back</button>
                
                </div>
                
            </div>
        )

}
export default Counter;