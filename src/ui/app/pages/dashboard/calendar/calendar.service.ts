import {Injectable} from "@angular/core";
import {BaThemeConfigProvider} from "../../../theme";

@Injectable()
export class CalendarService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {

    let dashboardColors = this._baConfig.get().colors.dashboard;
    return {
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      defaultDate: "2017-07-24",
      selectable: true,
      selectHelper: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: "All Day Event",
          start: "2017-07-02",
          color: dashboardColors.silverTree
        },
        {
          title: "Long Event",
          start: "2017-07-07",
          end: "2017-07-10",
          color: dashboardColors.blueStone
        },
        {
          title: "Update \n Data",
          start: "2017-07-14T20:00:00",
          color: dashboardColors.surfieGreen
        },
        {
          title: "Monthly \n Screen",
          start: "2017-07-01T07:00:00",
          color: dashboardColors.gossip
        }
      ]
    };
  }
}
