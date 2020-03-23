import React from 'react';
export class Editor extends React.Component {
	constructor(props){
		super();
		this.state = {
			cnt: props.content
		};
	}
	handle = (e)=>this.props.save(e.target.value);
	render() {
	  return <div className="Editor">
		  <div class="ribbon">
			  <div className="ribbon-btn">reset</div>
			  <div className="ribbon-btn">save</div>
		  </div>
		  <div className="content">
				<textarea onChange={this.handle}>{this.state.cnt}</textarea>
		  </div>
	  </div>;
	}
 }