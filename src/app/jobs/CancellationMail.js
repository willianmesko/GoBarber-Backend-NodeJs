import Mail from '../../lib/Mail';
import pt from 'date-fns/locale/pt';
import { format, parseISO } from 'date-fns';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { appointment } = data;

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.mail}>`,
            subject: 'Agendamento cancelado',
           template: 'cancellation',
           context: {
               provider: appointment.provider.name,
               user: appointment.user.name,
               date:  format(
                  parseISO(appointment.date),
                   "'dia' dd 'de' MMMM, 'ás' H:mm:h",
                   {locale: pt}
               ),
           }
        });
    }

}

export default new CancellationMail();