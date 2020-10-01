import React, { Component } from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export class CalendarTemplate extends Component {
    render() {
        return (
            <div>
                <FullCalendar 
                plugins={[dayGridPlugin]} 
                initialView="dayGridMonth"
                events={this.props.events}
                />
            </div>
        )
    }
}

export default CalendarTemplate
