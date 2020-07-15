import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, providerId }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointementInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointementInSameDate) {
      throw new AppError('This appointment is already booked', 409);
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
