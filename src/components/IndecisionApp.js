import React from 'react';
import AddOption  from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';



class IndecisionApp extends React.Component{
    state = {
        options : [],   
        selectedOption : undefined
    };
    subtitle = "Put your life in the hand of a computer";

    handleDeleteOptions = () =>{
        this.setState(() =>({options : []}));
    };

    handleDeleteOption =(optionToRemove) =>{
        this.setState((prevState) =>({
            options : prevState.options.filter((option) =>{
                return optionToRemove != option;
            })
        }));
    };

    handlePick = () =>{
        const randomNum = Math.floor(Math.random()*this.state.options.length);
        console.log(randomNum);
        const string = this.state.options[randomNum];
        this.setState(() => ({selectedOption :string}));
    };


    handleAddOption = (option) =>{
        if(!option){
        
            return 'Enter valid value to add item';
        } 
        else if (this.state.options.indexOf(option) > -1){
        
          return 'This option already exist';
        }
        this.setState((prevState) =>(
            {options : prevState.options.concat(option)}) );
    };

    handleLeave = () =>{
        this.setState(()  =>({selectedOption : undefined}));
    }

    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) {
                this.setState(() =>({options }));
            }
        }   catch (e) {

        }
       
    }
    
    componentDidUpdate(prevState){
        if (prevState.options.length != this.state.options.length){
          
            let json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount(){
        console.log('componentWillUnmount');
    }

    
    render(){
            return (
            <div>
                <Header subtitle={this.subtitle} />
                <div className="container">
                <Action 
                hasOptions={this.state.options.length >0}
                handleClick={this.handlePick}/>
                    <div className="widget">
                    <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}/>
        
                    <AddOption 
                    handleAddOption={this.handleAddOption}/>
                    </div>
                <OptionModal 
                selectedOption={this.state.selectedOption}
                handleLeave={this.handleLeave}/>
                </div>
        </div>
        );
    }
}

IndecisionApp.defaultProps ={
    options: []
};

export default IndecisionApp;