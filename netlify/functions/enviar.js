import nodemailer from 'nodemailer';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { nombre, correo, mensaje } = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${nombre}" <${process.env.EMAIL_USER}>`,
    replyTo: correo,
    to: process.env.EMAIL_TO,
    subject: `Contacto portafolio — ${nombre}`,
    text: `Nombre: ${nombre}\nCorreo del reclutador: ${correo}\nMensaje:\n${mensaje}`,
  });

  return { statusCode: 200, body: JSON.stringify({ success: true }) };
};
