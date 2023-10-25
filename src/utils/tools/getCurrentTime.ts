/** @format */

const getCurrentTime = (): string => {
 const now = new Date();

 const year = now.getFullYear();
 const month = now.getMonth() + 1;
 const day = now.getDate();
 const hours = now.getHours();
 const minutes = now.getMinutes();
 const seconds = now.getSeconds();

 const currentTime = `${year}-${padZero(month)}-${padZero(day)} ${padZero(
  hours
 )}:${padZero(minutes)}:${padZero(seconds)}`;

 return currentTime;
};

const padZero = (num: number): string => {
 return String(num).padStart(2, '0');
};

export default getCurrentTime;
