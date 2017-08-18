import React from 'react';

export class ModuleInfoComponent extends React.Component {
    render() {
        return(
            <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="well">
                    <div className="media">
                        <div className="badge-circle pull-left"><span style={{paddingLeft: "12px"}}>{this.props.count}</span></div>
                        <div className="media-body" style={{paddingLeft: "12px", paddingTop: "12px"}}>
                            <strong>{this.props.name}</strong>
                            <p>Default: {this.props.count}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}