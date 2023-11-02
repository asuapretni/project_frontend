import React, { Component } from "react";
import axios from "axios";

export default class PintxoItem extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pintxoItemClass: "",
            buttonClass: "btn",
            votes_state: null,
            isEnabled: "NOT_ENABLED"
        };
        
        this.handleClick = this.handleClick.bind(this);
        this.sendVotes = this.sendVotes.bind(this);
        this.handleDisabled = this.handleDisabled.bind(this);
        this.handleEnabled = this.handleEnabled.bind(this);
        
    }

    handleMouseEnter() {
        this.setState({ pintxoItemClass: "image-blur" });
    }

    handleMouseLeave() {
        this.setState({ pintxoItemClass: "" });
    }

    handleClick(event){
        event.currentTarget.disabled = true;
        console.log('button clicked');
        let get_id = event.currentTarget.name
        console.log(get_id);

        console.log('Nº Clicks', this.state.numberOfClicks);
        axios.get("https://asuapretni.pythonanywhere.com/votes/"+get_id)
        .then(response => {
            
            this.setState({
                votes_state: response.data.votes_number +1
            });
            
            console.log("this state votes", this.state.votes_state);
            
            this.sendVotes(get_id);
            
        }).catch(error => {
            console.log(error)
        }) 
    }
        
    sendVotes(get_id) {
        axios.patch("https://asuapretni.pythonanywhere.com/votes",
        {
            votes_id: get_id,
            votes_number: this.state.votes_state
        }
        ).then(response => {

            console.log("send votes", this.state.votes_state)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    handleDisabled() {
        this.setState({
            isEnabled: "disabled = true"
        });
        
    }

    handleEnabled() {
        this.setState({
            isEnabled: "disabled = false"
        })
    }

    render() {
        const { pintxo_id, pintxo_name, pintxo_img, pintxo_description, contestant_name } = this.props.item;

        return (
            <div className="pintxos-container">
                <div className="pintxo-item-wrapper"
                    onMouseEnter={() => this.handleMouseEnter()}
                    onMouseLeave={() => this.handleMouseLeave()}
                >
                    <div className="title">{pintxo_name}</div>
                    <div
                        className={"pintxo-img-background " + this.state.pintxoItemClass}
                        style={{
                            backgroundImage: 'url(data:image/jpg;base64,'+ pintxo_img + ')'
                        }}
                    />

                    <div className="img-text-wrapper">
                        <div className="subtitle">{pintxo_description}</div>
                    </div>
                </div>
                <form>

                    <button 
                        name={pintxo_id} 
                        className={this.state.buttonClass}
                        onClick={this.handleClick}                        
                    >
                        Vote
                    </button>
                    
                </form>
                
            </div> 
        );
    }
}