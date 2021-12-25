# Software-Engineers-in-Tears-2.0

<br>Hello!<br />
<br>*Welcome to Dune Airlines*<br />
<br>The aim of this project is to create a complete Airline Reservation System. Our website allows individuals can reserve and pay
for flights in order to travel to different countries and sometimes domestic cities.We offer only round trips. No one way tickets.<br />

<br> This project was implemented using MERN stack technologies in JavaScript. The project architecture is MVC style. Backend requests are handled in App.js file and the backend route controllers are in the Routes folder. All frontend styling and functionalities are in the client folder. Database Schemas are handled in the Models folder. <br />
<br>To run the project on VS code, first clone our repository "git clone https://github.com/advanced-computer-lab/Software-Engineers-in-Tears-2.0.gitmake".Then make sure you install the necessary files or softwares by running "npm i" in your console. Afterwards, split your terminal and run backend by typing "node App.js" in cosole. To run the front end change the directory to client then to src then type "npm start".<br />
<br> Emailing API used is nodemailer (https://nodemailer.com/about/)<br/>
<br> Payment by card was handled using Stripe API(https://thushaltk.medium.com/how-to-add-stripe-payment-gateway-to-your-mern-project-82f34691dc57)<br/>
<br> Authentication was handled by jsonWebTokens ()<br/>
<br> Password encryption done by bcrypt ()<br/>

<br> There are 3 navigation modes on the website:Admin,Guest and User. Each have different access priviliges to the website's features <br />
<br> *Admin Mode* <br />
<br> An admin can create,view, update and delete flights at all times.<br />
<br> *Guest Mode* <br />
<br> A guest user can search and view a list of all available depart or return flights upon his search criteria. He/She are able to select flights of prefernce and preview a summary of all it's details. If the guest user wishes to proceed and book this flight they must go to the sign up page and register to be user to access further features.<br />
<br>*User Mode*<br />
<br> A registered user is able to access all guest mode features plus now he/she can book desired flights and pay for them. In addition, they can access their bookings list and modify their reservations at any time. The user is also able to update his account information when desired. A user will recieve confirmation payment emails for any booking transactions he/she makes.<br />

<br> You can see demos of all our features here: https://drive.google.com/drive/folders/102ocBTJ5EoavL9sjOI32jkqZAciL2iIT?usp=sharing <br/>
<br> Both an admin and a registered user can login by their credentials from the log in page. <br/>
<br> Our UX/UI stands out. The design and colors are unique than other airlines websites. The user experience is easy, simple, and direct.</br>


<br>*Suggested uncompleted future feature*<br>
<br> 1- The top navigation bar buttons in the homepage.<br/>
<br> 2- The "manage booking", "check-in" and "Hotels" section in the user homepage.<br/>
<br> 3- The loyality Skywards program features. <br/>


<br> *How to contribute?*<br/>
<br> You can send your implementations for the suggested features to dunesairlines@gmail.com. Feel free to also send us your feedback and suggestions too.<br/>

<br>Our project was inspired by :</br>
<br>https://www.qatarairways.com/</br>
<br>https://www.etihad.com/</br>

<br>Resources,links,and articles that helped us:</br>
<br>https://blog.logrocket.com/mern-stack-tutorial/.</br>
<br>https://www.w3schools.com/REACT/DEFAULT.ASP</br>
<br>https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY</br>

