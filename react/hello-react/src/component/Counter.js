import React, {Component} from 'react';

class Counter extends Component{
    constructor(props){
        super(props);
        // state의 초기값 설정하기
        this.state = {
            number : 0
        }
    }

    render(){
        const {number} = this.state;

        return (
            <div>
                <h1>{number}</h1>
                <button
                    //onClick을 통해 버튼이 클릭되었을 때 호출할 함수를 지정합니다.
                    onClick = {() =>{
                         this.setState({number: number + 1});
                        }
                    }
                >
                    +1
                </button>
            </div>
        );
    }
}

export default Counter;