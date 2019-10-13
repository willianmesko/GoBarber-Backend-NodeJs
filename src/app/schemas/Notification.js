import moongose from 'mongoose';
import { stringify } from 'querystring';

const NotificationSchema = new moongose.Schema({

  content: {
      type: String, 
      required: true
  } ,
  user: {
      type: Number,
      required: true
  },
  read: {
      type: Boolean,
      required: false,
      default: false
  
  } 


}, {
    timestamps: true
});

export default moongose.model('Notification', NotificationSchema);