
/* eslint-disable-next-line */
export interface CustomerScheduleFormProps {
  caloriesPerDay: number;
}

export function CustomerScheduleForm({ caloriesPerDay }: CustomerScheduleFormProps) {
  return (
    <form action="#" method="get">
      <div className="personal-account-user__form">
        <div className="personal-account-user__input">
          <label><span className="personal-account-user__label">План на день, ккал</span>
            <input type="text" name="schedule-for-the-day" value={ caloriesPerDay } disabled />
          </label>
        </div>
        <div className="personal-account-user__input">
          <label><span className="personal-account-user__label">План на неделю, ккал</span>
            <input type="text" name="schedule-for-the-week" value={ caloriesPerDay * 7 } disabled />
          </label>
        </div>
      </div>
    </form>
  );
}

export default CustomerScheduleForm;
