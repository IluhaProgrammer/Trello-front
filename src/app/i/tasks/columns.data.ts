import dayjs, {type Dayjs} from 'dayjs'
import 'dayjs/locale/ru'
// Подключение локального времени если нужно
import isoWeek from 'dayjs/plugin/isoWeek'
// ISO неделя
import weekOfYear from 'dayjs/plugin/weekOfYear'

// Плагин для работы с неделями

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

export const FILTERS: Record<string, Dayjs> = {
    today: dayjs().startOf('day'), // Начало отсчета от начало дня 
    tomorrow: dayjs().add(1, 'day').startOf('day'), // Добавление еще одного дня
    'on-this-week': dayjs().endOf('isoWeek'), // Конец этой недели
    'on-next-week': dayjs().add(1, 'week').startOf('day'), // Добавление одной недели 
    later: dayjs().add(2, 'week').startOf('day') // Добавление двух недель
}

export const COLUMNS = [
    {
        label: 'Today',
        value: 'today'
    },
    {
        label: 'Tomorrow',
        value: 'tomorrow'
    },
    {
        label: 'On this week',
        value: 'on this week'
    },
    {
        label: 'On next week',
        value: 'on next week'
    },
    {
        label: 'Later',
        value: 'later'
    },
    {
        label: 'Completed',
        value: 'completed'
    }
]