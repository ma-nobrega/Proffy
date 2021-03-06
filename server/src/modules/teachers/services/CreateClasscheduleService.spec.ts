import AppError from '@shared/errors/AppError';
import FakeClassesSchedulesRepository from '../repositories/fakes/FakeClassesSchedulesRepository';
import CreateClassScheduleService from './CreateClassScheduleService';

let fakeClassesSchedulesRepository: FakeClassesSchedulesRepository;
let createClass: CreateClassScheduleService;

describe('CreateClassScheduleService', () => {
  beforeEach(() => {
    fakeClassesSchedulesRepository = new FakeClassesSchedulesRepository();
    createClass = new CreateClassScheduleService(
      fakeClassesSchedulesRepository,
    );
  });
  it('should be able to create a new classSchedule', async () => {
    const schedule = await createClass.execute({
      from: 0,
      to: 1,
      week_day: 0,
      class_id: '1232555612',
    });
    expect(schedule).toHaveProperty('id');
    expect(schedule.class_id).toBe('1232555612');
  });
  it('should not be able to create two classSchedule with the same name', async () => {
    const week_day = 0;

    await createClass.execute({
      from: 0,
      to: 1,
      week_day,
      class_id: '1232555612',
    });

    await expect(
      createClass.execute({
        from: 0,
        to: 0,
        week_day,
        class_id: '1232555612',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
