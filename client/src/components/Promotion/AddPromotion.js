import React from 'react';

class AddPromotion extends React.Component {
    state = {};

    handleChange = event => {
        const { name, value } = event.target;
    }

    render() {
        return (
            <div className="App">
                <h2 className="App"> Add Promotion</h2>
                <form className="form">
                    <input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
                    <textarea type="text" name="description" placeholder="Description" onChange={this.handleChange}></textarea>
                    <button type="submit" className="button-primary">Add</button>
                </form>
            </div>
        )
    }
}

export default AddPromotion;