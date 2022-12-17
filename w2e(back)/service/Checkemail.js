const { User } = require("../models")
const { sendGmail } = require("./Sendmail")

/** 이메일 중복확인 및 인증번호 발송 */
module.exports.Checkmail = async (option, res) => {
    console.log(option)
    await User.findOne({ where: { user_email: option.toEmail } }).then((e) => {
        if (e !== null) {
            console.log("중복임")
            res.send({
                checkstatus: false,
                sendstatus: false
            })
        }
        else {
            try {
                console.log("메일발송완료")
                sendGmail(option)
                res.send({
                    checkstatus: true,
                    sendstatus: true
                })
            } catch (error) {
                console.log(error)
            }
        }
    }).catch((error) => {
        console.log("중복은 아닌데 메일발송 시스템 문제ㄷ")
        console.log(error)
        res.send({
            checkstatus: true,
            sendstatus: false
        })
    })
}