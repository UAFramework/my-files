# My Files

This is a React Based Web App that provides simple access to files over web interface (File server over HTTP).
Purpose for this was sharing common media files with family members within the home network.

## Get started

```sh
# install Yarn package manager:
npm install yarn -g

# install dependencies:
yarn install

# start project in dev mode:
yarn dev
```

## Note

For local git in order to support cyrillic and other non English carachters properly, consider setting `core.quotepath=off`:

```sh
git config --global core.quotepath off
```

This will fix an issue with displaying file name in Git Bash console like this:

```
new file: "@root/\320\277\....txt"
```
