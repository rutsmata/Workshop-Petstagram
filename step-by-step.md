Mind: render is 'login' and redirect is '/login'
If not an owner, e.g. {{#if !isOwner}} is not working in hbs; should be {{#unless isOwner}} {{/unless}} or if-else where if remains empty and write in else
use try-catch in every get/post within the controllers where we change the data (create, update, delete, edit)
CTRL + P = search within the open files; then :15 will go to row 15; @ will open

1. Initialize project and structure
   - Create src folder and index.js in it. Fix main and start within package.json
2. Setup dev environment - nodemon. Then "start": "nodemon src/index.js"
3. Install and set-up express
   - add static middleware
   - add body-parser
   - add routes
4. Add static resources
5. Add views folder with ready htmls
   - add layouts, partials, users subfolders and redistribute files
6. Add express-handlebars view engine
   - install handlebars
   - add to express
   - config extension
   - add main.hbs file within layouts - within main.hbs copy from home.html all but main and above the footer write {{{body}}}
   - fix styles and images - within main.hbs and home.hbs check the hrefs to not begin with 'static' or other main-folder, they should go directly to css..., use relative path also. Same for every html/hbs implemented
   - fix navigation to home - within main.hbs replace the relevant href to '/'
   - render home page - leave main only within home.html and rename to .hbs and go to routes.js and change to res.render('home)
7. Add controllers (actions) folder with homeController
8. Add database
   - install mongoose
   - connect database
9. Authentication
   - add auth/user controller
   - add controller to routes
   - fix header navigation for login, register and logout - within main.hbs replace the relevant href to /users/login...Check for hrefs that need to go to home page, e.g '/'
   - render login page - userController router.get
   - render register page- userController router.get
10. Add user model
    - add unique index for username - if requested (depending what property should be unique)
    - validate repeat password using virtual property 'repeatPassword'
11. Modify login and register forms; in login.hbs we remove action (as the form will post at the same page; if we need posting to another page, then make the relevant path but then catch/fix this in the router of the server) and add method='post'. Also fill missing info within name=''. Also check for href that needs update, e.g for register link: /users/register. If we put value="{{username}}" it means it will populate the data which we have already used prior that, e.g pre-fill
12. Add login and register post actions in the userController. Test for proper actions: res.send('Logged in')
13. Add user manager
    - require in userController
    - add register method and test
    - validate if user already exits
14. Hash password
    - install bcrypt
    - hash password in User model
15. Login flow
    - find user by username
    - validate hashed password
16. Generate jwt token - create folder lib and file jwt.js
    - install jsonwebtoken
    - promisify jsonwebtoken
    - create SECRET
    - generate token in manager.login
17. Return token in cookie
    - install cookie-parser
    - config cookie-parser
    - set cookie with token
18. Logout in userController. Check in maih.hbs if the logout href is properly set to /users/logout. Test: result is token should be removed and redirected to home page
19. Authentication middleware. Add folder middlewares
    - create base middleware
    - use middleware (after cookieParser)
    - implement auth middleaware
    - attach decoded token to request
    - handle invalid token
20. Authorization middleware
21. Dynamic navigation - within main.hbs add conditionals for guest and login users"
    - {{#if isAuthenticated}} should have logout, personal profile, personal page
    - {{else}} should have login, register, catalog page...
    - add to res.locals is the authMiddleware
22. Error handling (should be only try-catch in the controller and return to the user)
    - add 404 page - remove /static path. Fix the href to lead to home page '/'
    - redirect missing route to 404
    - add global error handler in middlewares - (optional)
    - use global error handler after routes (optional)
    - add error message extractor
23. Show error notifications 
    - add error container to the main layout (very likely there is div within main.hbs which has to be populated)
    - show error container conditionally
    - pass error to render
    - add local error handler - in userController within post register code and post login code
24. Automatically login after register

Remaining:
Global error handler
Debug

Exam:
1. Read the requirements and colour functionalities already done with the skeleton
    - remove * route to 404 if not requested
    - change db name, PORT number
    - Amend/remove/add variables as per the new requirements in the user model
2. Check the new resources and replace existing htmls, especially main.hbs
3. Write the second model - put relevant error message as second parameter, e.g if required; export the model
4. Look-up for validation and error handling and modify the div for the error message
5. Look-up for Add/Create smth functionality to be implemented first. 
    - Create new resource folder (on the name of the reqirements, e.g. photos) within views and move the relevant add/create html in it. 
    - Delete all in the html but main 
    - Remove the form action text and add method 'post'. Fill missing name='' to match the already given in the Model naming convention
    - rename to hbs
    - create controller with name matching the resource name, e.g photoController.js and write the get
    - go to main.hbs and fix the href for the add/create route, e.g /photos/create
    - require the photoController in routes.js
    - test if add/create page is rendered
    - photoController.js and write the async post, in it use try-catch;  within try await the photoManager, then redirect according to the requirements, within catch use same error renderring. Require the photoManager and the errorHelper. Go to Model and make error message as second parameter
    - create photoManager.js where his function is to create photoData based on the Model (and pass to controller)
    - test if add/create info is stored in db and verify if all data as per the model are available, eg. ownerId. OwnerId is populated in req.user._id and should be added when reading the req.body data from the post request
    - test should be completed with message for can not get photos as we have not implemented it, e.g catalog page
6. Look-up for page (e.g catalog) which renders/lists the add/create functionality
    - move the catalog html to photos folder
    - delete all but main, check and detelete word static if needed, rename to hbs
    - go to photoController and write the get
    - test - the page should be available with the pre-hardcoded data
    - make page to render dynamically: 
        -- review the hbs and delete the repeating hardcoded content only, leave headers/footers and just one 'card' which may/may-not be separated to another hbs
        -- separate: cut the remaining single-card content and paste in new petPhoto.hbs (name should be logical to the contect) file within partials folder
        -- replace the hardcoded properties with dynamic properties, such as {{image}}, {{name}}, {{age}}... using the wording from the Model. If not working, we may use this.image.....
        -- alt="post" was changed to alt="{{name}}". Other changes for hrefs, ... at later stage 
        -- go to the hbs with deleted hardcoded content and write at the deleted space:      
            {{#each photos}}
                {{>petPhoto}}
            {{else}}
                    <!--If there are no photo yet!-->
                    <article class="not-available-photo">
                        <h1>No photo posts yet.</h1>
                    </article>
            {{/each}}
        -- go to photoController and add second parameter with curly brakets {photos} in the relevant get, which should come as a result of getAll function added now in the Manager. Add lean() at the end. Use try-catch
        -- return to photoManager and prepare getAll function which will find and extract all data for the Photo model from the db
        -- test if dynamic data are rendered in catalog
        -- return to the partials petPhoto.hbs where:
        --- we should populate the remaining dynamic info, such as owner username as requested. 
        ----Return to the Manager where in getAll function add populate method for the ('owner'), thus we will have all details for the owner: name, email...which can be used in the dynamic rendering, depending what we need to polupale from the owner's data such as: owner.username. 
        --- we should link the details href: '/photos/{{_id}}/details'
        --- usually it is required to show "No photo posts yet", e.g no dynamic data in db; this could be tested in the photoController to put empty array when rendering the db data, e.g {posts:[]}
7. Details page (very likely for logged-in users;  or maybe both with guests)
    - move details html into photos; delete all but main; delete static if present
    - write get in photoController - use async await and lean() upon return of data, then getOne in Manager and populate the owner
    - in hbs replace with dynamic data: populated at 2 levels, e.g {{photo.owner.username}}, remaining is 1 level, e.g {{photo.location}}
    - test for dynamic data.
    - Condition if the logged-in user is the owner of the card, by creating isOwner in the Controller and cascade down to the template
    - Use the already cascaded isOwner in the template within the section which requests to be visible by the owner/creator: {{#if isOwner}} condition text {{/if}}, usually owner/creatot should edit, delete
    - test with login with different users for condition display of the given edit/delete
    - check for other conditions on displaying the details page - which user what shall see. We may have double condition.
8. Delete
    - go to relevat delete section and change the href to "/photos/{{photo._id}}/delete"
    - go to photoController and write get. Use try-catch
9. Edit
    - move the html into photos folder 
    - edit the hbs - delete form the action and add method 'post'; remove static; fill the missing name attributes;  value attributes must be dynamic {{photo.name}} e.t.c
    - go to photoController and write get. Use lean()
    - go to details hbs and fix the edih href "/photos/{{photo._id}}/edit"
    - test if form populates the originally created data - it should says error cannot POST...and we need to prepare post functionality
    - write post in the controller, use try/catch
    - write edit function in the Manager
10. Profile
    - in homeController require the photoManager which has the information about the owner
    - not fully completed
