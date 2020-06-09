import './index.css';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, Inject, Day, WorkWeek, Month, Week, Agenda, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { SampleBase } from './sample-base';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
/**
 * schedule google calendar integration sample
 */
export class CalendarIntegration extends SampleBase {


    onDataBinding(e) {
        let items = e.result.items;
        let scheduleData = [];
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                let event = items[i];
                let when = event.start.dateTime;
                let start = event.start.dateTime;
                let end = event.end.dateTime;
                if (!when) {
                    when = event.start.date;
                    start = event.start.date;
                    end = event.end.date;
                }
                scheduleData.push({
                    Id: event.id,
                    Subject: event.summary,
                    StartTime: new Date(start),
                    EndTime: new Date(end),
                    IsAllDay: !event.start.dateTime,
                });
            }
        }
        e.result = scheduleData;
    }
   
    getCalendar = () => {
        this.calendarId = '';
        this.access_token = '';
        if(this.props.access_token){
            this.calendarId = this.props.calendarId
            this.access_token = this.props.access_token
        }
        console.log("COMPONENT DID MOUNT CALLED")
        console.log(this.calendarId)
        console.log(this.access_token)
        this.publicKey = 'AIzaSyBzte6hGGYs8n4rF7qX59CE4aaGtfCbjU0';

        this.dataManger = new DataManager({
            url: 'https://www.googleapis.com/calendar/v3/calendars/' + this.calendarId + '/events?key=' + this.publicKey ,
            adaptor: new WebApiAdaptor(),
            crossDomain: true,
            headers : { Authorization: `Bearer ${this.access_token}`},
            // + '?access_token='+this.access_token
        });
    }

    render() {
        this.getCalendar()
        return (<div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper drag-sample-wrapper'>
                        <div className="schedule-container">
                            <ScheduleComponent ref={schedule => this.scheduleObj = schedule} width='100%' height='650px' selectedDate={new Date(2018, 10, 14)}  eventSettings={{ dataSource: this.dataManger }} dataBinding={this.onDataBinding.bind(this)}>
                                <ViewsDirective>
                                    {/* <ViewDirective option='Day'/> */}
                                    <ViewDirective option='Week'/>
                                    {/* <ViewDirective option='WorkWeek'/>
                                    <ViewDirective option='Month'/>
                                    <ViewDirective option='Agenda'/> */}
                                </ViewsDirective>
                                <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
                            </ScheduleComponent>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

// render(<CalendarIntegration />, document.getElementById('sample'));
export default CalendarIntegration