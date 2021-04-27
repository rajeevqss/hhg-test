import React, {useState} from 'react';
import {RouteComponentProps} from 'react-router';

const Home: React.FC<RouteComponentProps> = ({history}) => {
    return (
            <div className="col-12 text-center mt-5">
                <h4>Home Page</h4>
                <button className="btn btn-primary mr-1" onClick={() => history.push('/employee') }>
                    Employee
                </button>
                <button className="btn btn-danger" onClick={() => history.push('/counter') }>
                    Counter
                </button>
            </div>
        )

}
export default Home;