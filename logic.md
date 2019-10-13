## Logic

```
const beforeTime = moment('08:00', format);
const afterTime = moment('17:00', format);

var currentTime = moment('08:00', format).add(405, 'm');// e.g. 2:45 pm
var endSchedTime = moment(currentTime, format).add(30, 'm');// e.g. 3:15 pm

let starScheduleIsBetween = currentTime.isBetween(beforeTime , afterTime);

let endSchedIsBetween = endSchedTime.isBetween(beforeTime , afterTime);


if (starScheduleIsBetween && endSchedIsBetween) {
    console.log('is between')

  console.log(currentTime.format('hh:mm a'))
  console.log(endSchedTime.format('hh:mm a'))

} else {

  console.log('is not between')

}
```
