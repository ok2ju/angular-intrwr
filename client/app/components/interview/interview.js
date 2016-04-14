import angular from 'angular';
import Calendar from './calendar/calendar';
import Feedback from './feedback/feedback';
import FeedbackForm from './feedback-form/feedback-form';
import InterviewRoom from './interview-room/interview-room';

let interviewModule = angular.module('interview', [
  Calendar.name,
  Feedback.name,
  FeedbackForm.name,
  InterviewRoom.name
]);

export default interviewModule;
