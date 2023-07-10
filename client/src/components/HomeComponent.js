import React,{Component} from 'react';

class Home extends Component {

    constructor(props){
        super(props);
        this.state={
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
      }

render(){
    return(
             <div className="container home text-center align-self-center" style={{marginTop: '3.75em'}}>
             <br/><br/><br/>
             <div className="row mt-3 darkbg text-center justify-content-center">
             <h1 align="center">LIBRARY INFORMATION SYSTEM </h1>
            </div>
            
            </div>

        );
}

}

export default Home;