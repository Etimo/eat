import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/sv';

dayjs.extend(weekday);
dayjs.extend(isBetween);
dayjs.locale('sv');

// Import this version of dayjs to access locale and plugins
export { dayjs };
