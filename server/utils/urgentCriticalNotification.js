import sendEmail from './sendEmail';

// sends email and sms when priority is critical
const urgentCriticalNotification = (group, sentBy) => {
  group.getUsers({
    attributes: ['email'],
    joinTableAttributes: []
  }).then((foundDetails) => {
    const emails = foundDetails.map(email => email.email)
    sendEmail(emails, sentBy, group.name)
  });
};

export default urgentCriticalNotification;
