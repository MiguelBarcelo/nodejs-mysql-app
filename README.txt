> npm init --yes
> npm i express express-handlebars express-session mysql express-mysql-session morgan bcryptjs passport passport-local timeago.js connect-flash express-validator 
> npm i nodemon -D
> mkdir lib public routes views
> npm run dev



Installing MariaDB Server on macOS Using Homebrew
-------------------------------------------------
Source: https://mariadb.com/kb/en/installing-mariadb-on-macos-using-homebrew/

// /usr/local/Homebrew/

> brew install mariadb

> mysql.server start

> brew services start mariadb

> mysql -u root

You should change the ownership of these directories to your user.
> sudo chown -R $(whoami) /usr/local/share/man/man3 /usr/local/share/man/man5 /usr/local/share/man/man7

And make sure that your user has write permission.
> chmod u+w /usr/local/share/man/man3 /usr/local/share/man/man5 /usr/local/share/man/man7


> mysql < text_file
> DROP DATABASE <dbname>

TERMINAL VSCODE
> sudo mysql -u root -p1234



VSCODE
> html:5

OSWALD GOOGLE FONTS
> https://fonts.google.com/specimen/Oswald?selection.family=Oswald


GITHUB.COM
----------
Quick setup -- if you've done this kind of thing before
https://github.com/MiguelBarcelo/nodejs-mysql-app.git

...or create a new repository on the command line
> echo "# proyecto1" >> README.md
> git init
> git add README.md
> git commit -m "first commit"
> git remote add origin https://github.com/MiguelBarcelo/nodejs-mysql-app.git
> git push -u origin master

...or push an existing repository from the command line
> git remote add origin https://github.com/MiguelBarcelo/nodejs-mysql-app.git
> git push -u origin master


MySQL Server
Source: https://www.zeppelinux.es/corregir-error-1698-28000-access-denied-for-user-rootlocalhost-en-mariadb-mysql/
------------
> mysql -u root -p
Enter password: 
ERROR 1698 (28000): Access denied for user 'root'@'localhost'

MariaDB [mysql]> alter user 'root'@'localhost' identified via mysql_native_password;
