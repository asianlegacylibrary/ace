
# Asian Classics Explorer (ACE)

Add description...

## Universal Viewer
add url..
IIIF client

postinstall script to copy uv folder from node_modules


## PYTHON
Create virtualenv:
$ which python3
$ virtualenv -p /path/to/python3 venv

When using VS Code, important settings.json in .vscode dir:
"python.pythonPath": "./src/python/venv/bin/python3.7","python.globalModuleInstallation": true

## Available Scripts
In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn deploy-surge`
Builds the app, renames index.html to 200.html (see surge docs)
and deploys the build dir to ace.asianclassics.org


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).