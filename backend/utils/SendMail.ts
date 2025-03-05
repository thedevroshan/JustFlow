import { Transporter } from "./Transporter";

export const SendMail = async (
  to: string,
  subject: string,
  text?: string,
  htmlContent?: string
): Promise<void | boolean> => {
  try {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlContent?htmlContent:'',
        text: text?text:''
    }
    await Transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    if ((process.env.NODE_ENV as string) == "development") {
      console.log(error);
      return;
    }
    return false;
  }
};
