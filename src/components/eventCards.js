import React, { Component } from 'react'

export class EventCardsComponent extends Component {
    render() {
        const eventDetails = this.props.event
        return (
            <>
                <div className="card mb-2">
                    <div className="card-body d-flex w-100 justify-content-between">
                        <div className="event-info">
                            <p><strong className="h6">Date Scheduled: </strong> {eventDetails.startdate} - {eventDetails.enddate}</p>
                            <p><strong className="h6">Person: </strong>{eventDetails.name} (Age: {eventDetails.age}) | {eventDetails.email} | {eventDetails.phonenumber}</p>
                            <p><strong className="h6">Address: </strong>{eventDetails.address}</p>
                            
                        </div>
                        <div className="event-actions">
                            <div className="btn-group">
                            <button className="btn btn-success">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default EventCardsComponent
