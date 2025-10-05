import { DashboardController } from './controllers/dashborad/dashboardController.js';

$(document).ready(function () {
 const dash = new DashboardController();
 dash.init();
});
