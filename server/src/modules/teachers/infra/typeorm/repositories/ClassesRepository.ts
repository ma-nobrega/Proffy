import IClassesRepository from '@modules/teachers/repositories/IClassesRepository';
import ICreateClassDTO from '@modules/teachers/dtos/ICreateClassDTO';
import { getRepository, Repository } from 'typeorm';
import IFindAllClass from '@modules/teachers/dtos/IFindAllClass';
import Class from '../entities/Class';

class ClassesRepository implements IClassesRepository {
  private ormRepository: Repository<Class>;

  constructor() {
    this.ormRepository = getRepository(Class);
  }

  public async findBySubject(subject: string): Promise<Class | undefined> {
    const user = await this.ormRepository.findOne({
      where: { subject },
    });
    return user;
  }

  public async findAllClasses({ user_id }: IFindAllClass): Promise<Class[]> {
    const users = await this.ormRepository.find({
      where: { user_id },
    });
    return users;
  }

  public async create({
    subject,
    cost,
    user_id,
  }: ICreateClassDTO): Promise<Class> {
    const user = this.ormRepository.create({ subject, user_id, cost });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(lesson: Class): Promise<Class> {
    return this.ormRepository.save(lesson);
  }
}

export default ClassesRepository;
