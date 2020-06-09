import './index.css';
import * as React from 'react';
import { ScheduleComponent, ViewsDirective, Inject, Day, WorkWeek, Month, Week, Agenda, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { SampleBase } from './sample-base';
/**
 * schedule google calendar integration sample
 */
export class Calendar extends SampleBase {

    render() {
        return (<div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper drag-sample-wrapper'>
                        <div className="schedule-container">
                            <ScheduleComponent ref={schedule => this.scheduleObj = schedule} width='100%' height='650px' selectedDate={new Date(2018, 10, 14)} >
                                <ViewsDirective>
                                    <ViewDirective option='Day'/>
                                    <ViewDirective option='Week'/>
                                    <ViewDirective option='WorkWeek'/>
                                    <ViewDirective option='Month'/>
                                    <ViewDirective option='Agenda'/>
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
export default Calendar