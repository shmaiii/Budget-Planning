# Budget Planning

# Intro :
An app that helps students living on a budget plan, manage, and keep track of monthly budgets. Users will specify deposits, income, planned payments and savings, and the app will track and create monthly reports for budget handling. 

# Tech goals:
- Django framework as backend, React.js for frontend, Django built in SQLite as database. 
- Write testings for both backend and frontend, using Selenium for client-side testing. 
- Application should be packaged into Docker, and finally deployed using Heroku. 

# Specifications goals: 
- Users should log in/register to be able to use the functionality. 

- Homepage: 
+ Welcome message 
+ Current month numbers including total deposits, expense expected, expense actual and current savings with default value of 0
+ Latest reports of current month (red/green)
+ A statement of whether user has exceeded monthly budgets or not (red/green)

- Setup: user sets up monthly allocations according to categories, monthly savings and monthly income here for app to track
- Tracking: user can enter daily payments or income here
- Reports: at the end of each month a report will be scheduled to contain all of the payments/income generated.  
