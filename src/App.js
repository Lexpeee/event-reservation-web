import React from 'react';
import CalendarTemplate from './components/templates/calendar';
import EventCardsComponent from "./components/eventCards";
import { Modal } from "react-bootstrap";
import { baseUrl } from "./static";
import axios from "axios";

class App extends React.Component {
  state = {
    addEventModal: false,
    eventData: [],
    events: [],
    formAddEventData: {
      name: '',
      email: '',
      age: 0,
      phonenumber: '',
      address: '',
      startdate: '',
      enddate: '',
    }
  }

  toggleAddEventModal = value => {
    this.setState({addEventModal: ((value === 1) ? true : false)})
  }

  fetchEvents = async () => {
    let temp = []
    let data = await axios.get(`${baseUrl}reservations`)
    .then((res)=>{
      return res.data
    })
    this.setState({eventData: data.payload})
    
    this.state.eventData.map((ev,i)=>{
      return temp.push({
        title: ev.name,
        start: ev.startdate,
        end: ev.enddate
      })
    })
    this.setState({events: temp})
    return
  }

  checkDate = async date => {
    // console.log(date)
    // let data = await axios.post(`${baseUrl}reservations/check/date/start`, {startDate: date})
    //   .then((res)=>{
    //     console.log(res.data)
    //   })
    console.log("checking date")
    return true;
  }

  handleChange = event => {
    let data = {...this.state.formAddEventData, [event.target.name]: event.target.value}
    if(event.target.name === 'startdate'){
      this.checkDate(event.target.value)
    }
    this.setState({formAddEventData: data})
  }

  handleSubmit = async event => {
    event.preventDefault()
    console.log(this.state.formAddEventData)
    let data = await axios.post(`${baseUrl}reservations`, this.state.formAddEventData)
    .then((res)=>{
      this.fetchEvents()
    })
  }

  componentDidMount(){
    this.fetchEvents()
  }

  render(){
    return (
      <div className="App">

        <Modal show={this.state.addEventModal} onHide={() => this.toggleAddEventModal(0)} animation="fade">
          <form onSubmit={this.handleSubmit}>
            <Modal.Header>
              <Modal.Title>Add your schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                  <div className="form-group">
                    <label htmlFor="txtName">Name</label>
                    <input type="text" name="name" id="txtName" onChange={this.handleChange} className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtName">Age</label>
                    <input type="number" name="age" id="txtAge" onChange={this.handleChange} className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtName">Email</label>
                    <input type="text" name="email" id="txtEmail" onChange={this.handleChange} className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtName">Phone Number</label>
                    <input type="text" name="phonenumber" id="txtPhoneNumber" onChange={this.handleChange} className="form-control"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtName">Address</label>
                    <textarea name="address" id="txtAddress" onChange={this.handleChange} className="form-control" rows="5"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtName">Start Date</label>
                    <input type="date" name="startdate" id="txtStartDate" onChange={this.handleChange} className="form-control"/>
                    <small id="msgDateSearchFailed" className="form-text text-danger"><i className="material-icons">cancel</i> Date is already taken.</small>
                    <small id="msgDateSearchSuccess" className="form-text text-success"><i className="material-icons">check_circle</i> Date is available</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="txtName">End Date</label>
                    <input type="date" name="enddate" id="txtEndDate" onChange={this.handleChange} className="form-control"/>
                  </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={() => this.toggleAddEventModal(0)}>Close</button>
              <button className="btn btn-primary">Submit</button>
            </Modal.Footer>
          </form>
        </Modal>
        
        <div className="container">
          <div className="row py-5">
            <div className="col-xs-12 col-md-6">
              <h1>Event Calendar</h1>
              <p>A project made by @lexpeee(John Alexis Pineda)</p>
              <p>What would you like to do?</p>
              <div className="btn-group">
                <button className="btn btn-sm btn-primary" onClick={() => this.toggleAddEventModal(1)}>Add event</button>
                {/* <button className="btn btn-sm btn-outline-primary">See all events</button> */}
              </div>
            </div>
            <div className="col-xs-12 col-md-6">
              <CalendarTemplate events={this.state.events}/>
            </div>
          </div>

          <div id="event-list-wrapper">
            <div className="card">
              <div className="card-body">
                <h3>
                  List of scheduled events
                </h3>
                <hr/>
                {this.state.eventData.map((val, i)=>{
                  return(
                    <EventCardsComponent key={i} event={val}/>
                  )
                })}


              </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
