import User from '../Models/User.js'
import JsonResponse from '../base/response.js'
import bcrypt from 'bcryptjs';

class UserController {
    async register(req, res) {
        const { name, email, phone, password } = req.body;
        
        let userDetail = await User.find({ email: email });
        if (userDetail.length > 0) {
            return new JsonResponse(res).success(userDetail, 'User already exists', 200);
        }

        userDetail = User.create({
            name: name,
            email: email,
            phone: phone,
            password: password,
            profile: req.file.path,
        })

        res.send(userDetail);
    }

    async login(req, res) {
        res.send('this is login');
    }
}

export default new UserController();
