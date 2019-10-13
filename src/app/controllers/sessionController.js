import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/Files';
import authConfig from '../../config/auth';
import * as Yup from 'yup';

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
         });  
         
         
         if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Preencha os dados corretamente.'});
        }
         
         

        const user = await User.findOne({ 
            where: { email: req.body.email },
            include: [
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['id','path','url'],
                }
            ]
        });

        if(!user) {
            return res.status(401).json({ error: 'Usuario não encontrado ' });
        }

        if(!(await user.checkPassword(req.body.password))) {
            res.status(401).json({error: 'Senha inválida'});
        }
        const { id, name, email, provider, avatar } = user;

        return res.json({
            user: {id, name, email, provider, avatar},
            token : jwt.sign( { id }, authConfig.secret,{
                expiresIn: authConfig.expiresIn,
                }),
            })
    }
}
export default new SessionController();
