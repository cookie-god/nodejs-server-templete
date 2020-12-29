const pool = require('../database.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userService = require('../service/userService.js');
const util = require('../function.js');

let secret_key = 'server_jwt_key_01022237869';

exports.enroll = async function(req, res){
    const {
        id, password, name, age
    } = req.body;

    var data = {};

    if(!id)
        return res.json(util.returnMake(data, false, 301, '아이디를 입력해주세요.'));
    if(id.length > 15) 
        return res.json(util.returnMake(data, false, 302, '아이디는 15자리 미만으로 입력해주세요.'));

    if(!password) 
        return res.json(util.returnMake(data, false, 303, '비밀번호를 입력해주세요.'));
    if(password.length < 6 || password.length > 15) 
        return res.json(util.returnMake(data, false, 304, '비밀번호는 6~15자리를 입력해주세요.'));

    if(!name) 
        return res.json(util.returnMake(data, false, 305, '이름을 입력해주세요.'));
    if(name.length > 5) 
        return res.json(util.returnMake(data, false, 306, '이름은 최대 5자리 입력가능합니다.'));

    if(!age) 
        return res.json(util.returnMake(data, false, 307, '나이를 입력해주세요.'));

    try {
        const idRows = await userService.userIdCheck(id);
        if(idRows[0].CNT > 0) {
            return res.json(util.returnMake(data, false, 308, '중복된 아이디입니다.'));
        }

        const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');
        const insertUserInfoParams = [id, hashedPassword, name, age];
        const insertUserRows = await userService.insertUserInfo(insertUserInfoParams);

        return res.json(util.returnMake(data, true, 200, '회원가입 성공'));
    } catch (err) {
        return res.status(500).send(`Error: ${err.message}`);
    }
}

exports.login = async function (req, res) {
    const {
        id, password
    } = req.body;

    var data = {};

    if(!id)
        return res.json(util.returnMake(data, false, 301, '아이디를 입력해주세요.'));
    if(id.length > 15)
        return res.json(util.returnMake(data, false, 302, '아이디는 15자리 미만으로 입력해주세요.'));

    if(!password) 
        return res.json(util.returnMake(data, false, 303, '비밀번호를 입력해주세요.'));
    
    try {
        const [userInfoRows] = await userService.selectUserInfo(id)

        if(userInfoRows.length < 1) {
            return res.json(util.returnMake(data, false, 304, '아이디를 확인해주세요.'));
        }

        const hashedPassword = await crypto.createHash('sha512').update(password).digest('hex');
        if(userInfoRows[0].userPw !== hashedPassword) {
            return res.json(util.returnMake(data, false, 305, '비밀번호를 확인해주세요.'));
        }

            //토큰 생성
        let token = await jwt.sign({
                id: userInfoRows[0].userId,
                password: userInfoRows[0].userPw
            }, // 토큰의 내용(payload)
           secret_key, // 비밀 키
            {
                 expiresIn: '365d',
                subject: 'userInfo',
             } // 유효 시간은 365일
        );

         await jwt.verify(token, secret_key, (err, decoded) => {
            decode_id = decoded.id;
            decode_pw = decoded.password;
        });
        data = ({jwt: token, decode_id: decode_id, decode_pw: decode_pw});
        data = util.returnMake(data, true, 200, "로그인 성공");
        return res.json(data);

    }catch(err) {
        return false;
    }
};